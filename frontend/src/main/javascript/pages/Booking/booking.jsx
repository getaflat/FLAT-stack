import React from 'react';
import styles from './booking.css'
import globalStyles from '../../general-styles/global.css';
import axios from 'axios';
import api from '../../services/api'
import { isLoggedIn, getUser, getToken } from '../../services/auth';
import { isEmptyObject, isEqual, imageBlobToBase64 } from '../../util';

import update from 'immutability-helper';

import InputValidationField from '../../components/InputValidationField';

//TODO überflüssiges am Ende löschen
import { run, rule } from '../../services/validation';
import { mustMatch, maxAge, isEmail, minAge, exactLength, minLength, isRequired } from '../../services/rules';

//Regeln
//TODO minAge wird zu minWeek, maxAge wird zu maxWeek, Funktion schreiben bzw. minYear und maxYear

//TODO Jahreswechsel berücksichtigen und Ende muss immer nach Beginn liegen
//TODO Jahreswechsel erst ab KW 50 bei Beginn oder bis max KW 3 bei Ende berücksichtigen, dh. in einem Feld muss 2017 und im anderen 2018 stehen
//TODO Beim Abnahme ist KW 26, also min 27/2017 und  max 26/2018 möglich, Hardcoden?????

//TODO maximal 4 Wochen bzw. Differenz von end und start max. 3
//TODO ggf. Problem weil startYear und endYear kein Label haben und es das CSS verhagelt

const rules = [

    rule("start", "Beginn", isRequired, minAge(1), maxAge(52)),
    rule("end", "Ende", isRequired, minAge(1), maxAge(52)),
    rule("startYear", " ", isRequired, minAge(2017), maxAge(2018)),//TODO leeres Label?
    rule("endYear", " ", isRequired, minAge(2017), maxAge(2018)),//TODO leeres Label?

];

export default class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {},
            booking: {
                start: '',

                end: '',

                additionalCosts: 0,
                points: 0
            },

            startYear: '',
            endYear: 2017,

            fewo: {
                name: '',
                id: 0,
                description: '',
                persons: 0,
                rooms: 0,
                size: 0,
                children: '',
                pets: '',
                balcony: ''
            },

            description: '',
            picture: '',
            basebooking: {},
            user: {},
            factors: [],

            validation: {
                show: false,
                errors: {}
            },
            error: ''
        };

        this.state.validation.errors = run(this.state.booking, rules);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.calcCost = this.calcCost.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        });

        this.setState({
            basebooking: this.state.booking
        });

        api.get('/apartments/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            this.setState({
                fewo: {
                    name: data.name,
                    id: data.apartmentId,
                    description: data.description,
                    persons: data.numberOfPersons,
                    rooms: data.numberOfRooms,
                    size: data.size,
                    children: data.infantsAllowed ? "Ja": "Nein",
                    pets: data.animalsAllowed ? "Ja": "Nein",
                    balcony: data.hasBalcony ? "Ja" : "Nein"
                }
            });

            return api.get('/images/search/findByApartmentId', {
                params: {
                    apartmentId: data.apartmentId
                }
            })
        }).then(({ data }) => {
            this.setState({
                picture: imageBlobToBase64(data._embedded.images[0].image)
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (isLoggedIn() && !isEmptyObject(this.state.user) && !isEqual(this.state.user, prevState.user)) {

        }
    }

    getFactors(durations) {
        return axios.all(durations.map((duration) => (
            api.get('/factors/search/findByCalenderWeek', {
                params: {
                    calenderWeek: duration
                }
            })
        ))).then((results) => {
            return results.map(({ data: factor }) => factor);
        });
    };

    calcCost(event) {
        event.preventDefault();

        //TODO Validation

        /*this.setState((prev) => update(prev, {
            validation: {
                show: { $set: true }
            }
        }));

        if (Object.keys(this.state.validation.errors).length !== 0) {
            return null;
        }*/

        let { start, end } = this.state.booking;
        let duration = Math.abs(end - start);

        if (end > 52 || start > 52 || duration > 4) {
            return;
        }

        this.refs.submitB.style.display = "flex";
        this.refs.calcB.style.display = "none";

        let durations = [];

        for (let i = 0; i < duration + 1; i += 1) {
            durations[i] = (+start + i) % 52;
        }

        axios.all([
            this.getFactors(durations),
            api.get('/apartments/search/findByName', {
                params: {
                    name: this.props.match.params.id
                }
            })
        ]).then(axios.spread((factors, { data: apartment }) => {
            return factors.reduce((accumulator, factor) => {
                console.log(accumulator, factor);
                return accumulator + apartment.basePrice + apartment.basePrice * (factor/100)
            }, 0);
        })).then((points) => {
            let totalScore = this.state.user.totalScore;
            let additionalCosts = 0;

            if (points > totalScore) {
                additionalCosts = (points - totalScore) * 20;
            }

            this.setState((prev, props) => update(prev, {
                booking: {
                    points: { $set: points },
                    additionalCosts: { $set: additionalCosts }
                }
            }));
        });

        //TODO fehler werfen, wenn rules nicht erfüllt

        /*.catch((error) => {
            let message = 'Fehler, bitte versuchen sie es später erneut';

            if (error.response && error.response.status === 422) {
                message = 'Bitte überprüfen sie Ihre Angaben';
            } else if (error.response && error.response.status === 409) {
                message = 'Diese E-Mail Adresse wird bereits verwendet';
            }

            this.setState({ error: message });
        })*/
    }

    handleSubmit(event) {

        event.preventDefault();

        //TODO endYear nach Buchen an DB übermitteln, startYear nicht
        //TODO Punkte von User reduzieren (soll im Dashboard, Header ersichtlich sein)

        //TODO hier geht gar nix mit der DB :-(
        //TODO Buchungsanfrage übermitteln, ich hab mir hier ein Beispiel überlegt, das jedoch komplett falsch sein kann
        //Beispiel


        //TODO in BookingRepository.java habe ich ein maxBooking angelegt, jedoch auskommentiert, weil ich nicht weiß, ob es funktioniert, ggf. überflüssig wg. post

        //höchste vergebene BookingID bekommen um sie dann um 1 zu inkrementieren, damit ich eine id für die aktuelle Buchungsanfrage habe ->sollte post erledigen
        api.post('/bookings', { ...this.state.booking }).then(({data}) => {
            console.log(data);
        }).catch(({error}) => {
            console.log(error);
        });

        //Buchung übermitteln Version 1, jedoch nicht vollständig
        /*api.post('/bookings/search/updateBooking',
         {
         params: {
         contractNumber: this.state.customer.contractNumber,
         apartmentId: this.state.fewo.name,
         start: this.state.booking.start,
         end: this.state.booking.end,
         price: this.state.booking.points,
         addtionalCharge: this.state.booking.additionalCosts
         }
         });*/

        //Buchung übermitteln Teilcode Variante2
        /*register({ ...this.state.customer }).then(() => {
            this.props.history.push('/user');
        })*/

        //alte Variante von Josua
        /*api.get(`/booking/${this.state.booking.contractnumber}`).then(({data}) => {
            this.setState({contractnumberCurrent: data.contract_number});
        }).then(() => {
            api.post('/booking', {

                numberOfPeople: this.state.booking.numberOfPeople,
                animals: this.state.booking.animals,
                children: this.state.booking.children,
                start: this.state.booking.start,
                end: this.state.booking.end,

                //get costs and additonalCosts


            });


        }).catch(
            function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    if(error.response.status === 404) {
                        input.style.borderColor = "red";
                        alert("Buchung konnte nicht erfolgen");
                    }
                }
            });*/


        //Label Bestätigung anzeigen //TODO am Ende auskommentieren
        /*this.refs.submitLabel.style.display = "flex";
        setTimeout(() => {
            this.refs.submitLabel.style.display = "none";

            //dashboard weiterleiten
            this.props.history.push('/user');
        }, 2000)*/;

    }

    handleInput(event) {
        let {name, value} = event.target;

        let state = this.setState((prev) => update(prev, {
            booking: {
                [name]: {
                    $set: value
                }
            }
        }));

        //TODO Fehler, weil validation nicht definiert ist

        // state.validation.errors = run(state.booking, rules);
        // state.error = '';
    }

    clearInputs() {
        this.setState({
           booking: this.state.basebooking
        });

        this.refs.submitB.style.display = "none";
        this.refs.calcB.style.display = "flex";
    }


//TODO wg. Input Validation Field muss CSS komplett überarbeitet werden

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <h1>Buchung</h1>
                <div className={styles.booking}>
                    <div className={styles.leftBooking}>
                        <div>
                            <img className={styles.image} src={this.state.picture}/>
                        </div>
                        <br/>
                        <div>
                            <h3 className={styles.heading}>{this.props.match.params.id}</h3>
                        </div>
                        <div className={styles.facts}>
                            <section>{this.state.fewo.description}</section><br />
                            <section className={styles.detail}>Details:</section>
                            <section>Personenanzahl: {this.state.fewo.persons}</section>
                            <section>Raumanzahl: {this.state.fewo.rooms}</section>
                            <section>Größe: {this.state.fewo.size}</section>
                            <section>Balkon vorhanden: {this.state.fewo.balcony}</section>
                            <section>Tiere erlaubt: {this.state.fewo.pets}</section>
                            <section>Kinder: {this.state.fewo.children}</section>
                        </div>
                    </div>
                    <br/>
                    <div className={styles.rightBooking}>
                        <form onReset={this.clearInputs}>
                            <label>Von:</label>
                            <input
                                required={true}
                                className={globalStyles.input}
                                name="start"
                                value={this.state.booking.start}
                                ref="startInput"
                                type="number"
                                placeholder="KW"
                                min={1}
                                max={52}
                                onChange={this.handleInput}/>

                            {/*<InputValidationField
                                label="Von:"
                                required={true}
                                className={globalStyles.input}
                                name="start"
                                value={this.state.booking.start}
                                ref="startInput"
                                type="number"
                                placeholder="KW"
                                min={1}
                                max={52}
                                onChange={this.handleInput}
                                showError={this.state.validation.show}
                                errorText={this.state.validation.errors.start}/>*/}

                            <br/>
                            <label> </label>
                            <input
                                required={true}
                                className={globalStyles.input}
                                name="startYear"
                                ref="startYearInput"
                                type="number"
                                placeholder="Jahr"
                                min={2017}
                                max={2018}
                                onChange={this.handleInput}/>

                            {/*<InputValidationField
                             label=""
                             required={true}
                             className={globalStyles.input}
                             name="startYear"
                             value={this.state.booking.startYear}
                             ref="startYearInput"
                             type="number"
                             placeholder="Jahr"
                             min={2017}
                             max={2018}
                             onChange={this.handleInput}
                             showError={this.state.validation.show}
                             errorText={this.state.validation.errors.startYear}/>*/}

                            <br/>
                            <br/>

                            <label>Bis:</label>
                            <input
                                required={true}
                                className={globalStyles.input}
                                name="end"
                                value={this.state.booking.end}
                                ref="endInput"
                                type="number"
                                placeholder="KW"
                                min={1}
                                max={52}
                                onChange={this.handleInput}/>

                            {/*<InputValidationField
                             label="Bis:"
                             required={true}
                             className={globalStyles.input}
                             name="end"
                             value={this.state.booking.end}
                             ref="endInput"
                             type="number"
                             placeholder="KW"
                             min={1}
                             max={52}
                             onChange={this.handleInput}
                             showError={this.state.validation.show}
                             errorText={this.state.validation.errors.start}/>*/}
                            <br/>
                            <label> </label>
                            <input
                                required={true}
                                className={globalStyles.input}
                                name="startYear"
                                ref="startYearInput"
                                type="number"
                                placeholder="Jahr"
                                min={2017}
                                max={2018}
                                onChange={this.handleInput}/>

                            {/*<InputValidationField
                             label=""
                             required={true}
                             className={globalStyles.input}
                             name="endYear"
                             value={this.state.booking.endYear}
                             ref="endYearInput"
                             type="number"
                             placeholder="Jahr"
                             min={2017}
                             max={2018}
                             onChange={this.handleInput}
                             showError={this.state.validation.show}
                             errorText={this.state.validation.errors.startYear}/>*/}

                            <br/>
                            <br/>

                            <label>Kosten (Punkte):</label>
                            <input
                                className={globalStyles.input + ' ' + styles.cost}
                                name="points"
                                value={this.state.booking.points}
                                ref="costsInput"
                                type="text"
                                readOnly="readOnly"
                                onChange={this.handleInput}/>
                            <br/>
                            <br/>

                            <label>Zusatzkosten (€):</label>
                            <input
                                className={globalStyles.input + ' ' + styles.cost}
                                name="additionalCosts"
                                value={this.state.booking.additionalCosts}
                                ref="additionalCostsInput"
                                type="text"
                                readOnly="readOnly"
                                onChange={this.handleInput}/>
                            <br/>
                            <br/>

                            <div className={styles.button}>
                                <button className={globalStyles.button} type="reset">
                                    abbrechen
                                </button>
                                <button ref="calcB" className={globalStyles.button + ' ' + styles.calcButton} onClick={this.calcCost}>
                                    Kosten berechnen
                                </button>
                                <button ref="submitB" className={globalStyles.button + ' ' + styles.submitButton} onClick={this.handleSubmit}>
                                    Buchungswunsch anmelden
                                </button>
                            </div>
                            <br/>
                            <div className={styles.submitResponse}>
                                <label ref="submitLabel" className={styles.bookingLabel}>Ihre Buchungsanfrage wird bearbeitet</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}