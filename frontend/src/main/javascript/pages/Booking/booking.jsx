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
import { mustMatch, maxAge, isEmail, minAge, exactLength, minLength, isRequired, minWeek, maxWeek, minYear, maxYear} from '../../services/rules';

//Regeln
//TODO minAge wird zu minWeek, maxAge wird zu maxWeek, Funktion schreiben bzw. minYear und maxYear

//TODO Jahreswechsel berücksichtigen und Ende muss immer nach Beginn liegen
//TODO Jahreswechsel erst ab KW 50 bei Beginn oder bis max KW 3 bei Ende berücksichtigen, dh. in einem Feld muss 2017 und im anderen 2018 stehen
//TODO Beim Abnahme ist KW 26, also min 27/2017 und  max 26/2018 möglich, Hardcoden?????

//TODO maximal 4 Wochen bzw. Differenz von end und start max. 3
//TODO ggf. Problem weil startYear und endYear kein Label haben und es das CSS verhagelt

const rules = [
    rule("start", "Beginn", isRequired, minWeek(1), maxWeek(52)),
    rule("end", "Ende", isRequired, minWeek(1), maxWeek(52)),
    rule("startYear", " ", isRequired, minYear(2017), maxYear(2018)),//TODO ohne Label möglich?
    rule("endYear", " ", isRequired, minYear(2017), maxYear(2018)),//TODO ohne Label möglich?
];

//TODO startYear und endYear wieder zum state booking, jedoch startYear wird nicht an DB gesendet
export default class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {},
            booking: {
                start: '',
                end: '',
                startYear: '',
                endYear: '',
                additionalCosts: 0,
                points: 0
            },



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

        this.setState((prev) => update(prev, {
            validation: {
                show: { $set: true }
            }
        }));

        if (Object.keys(this.state.validation.errors).length !== 0) {
            return null;
        }

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
                return accumulator + apartment.basePrice + Math.round(apartment.basePrice * (factor/100))
            }, 0);
        })).then((points) => {
            let totalScore = this.state.user.totalScore;
            let additionalCosts = 0;

            if (points > totalScore) {
                additionalCosts = (points - totalScore);
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

        this.setState((prev) => update(prev, {
            validation: {
                show: { $set: true }
            }
        }));

        if (Object.keys(this.state.validation.errors).length !== 0) {
            return null;
        }

        api.post('/bookingsnew/add', {
            contractNumber: this.state.user.contractNumber,
            week1: this.state.booking.start,
            week2: this.state.booking.end,
            apartmentId: this.state.fewo.id,
            price: this.state.booking.points,
            year: this.state.booking.startYear,
            additionalCharge: this.state.booking.additionalCosts
        }).then(() => {
            this.props.onUserChange();

            setTimeout(() => {
                this.props.history.push('/user');
            }, 2000);
        }).catch((error) => {
            console.log(error);
        });
    }

    handleInput(event) {
        let {name, value} = event.target;

        let state = update(this.state, {
            booking: {
                // On this page we are only validating numeric inputs
                [name]: { $set: parseInt(value, 10) }
            }
        });

        state.validation.errors = run(state.booking, rules);
        state.error = '';

        this.setState(state);
    }

    clearInputs() {
        this.setState({
           booking: this.state.basebooking
        });

        this.refs.submitB.style.display = "none";
        this.refs.calcB.style.display = "flex";
    }


//TODO wg. Input Validation Field muss CSS ggf. komplett überarbeitet werden

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
                            <InputValidationField
                                label="Von: "
                                type="number"
                                name="start"
                                placeholder="KW"
                                value={this.state.booking.start}
                                onChange={this.handleInput}
                                showError={this.state.validation.show}
                                errorText={this.state.validation.errors.start}
                            />

                            <InputValidationField
                                label=""
                                type="number"
                                name="startYear"
                                placeholder="Jahr"
                                value={this.state.booking.startYear}
                                onChange={this.handleInput}
                                showError={this.state.validation.show}
                                errorText={this.state.validation.errors.startYear}
                            />

                            <InputValidationField
                                label="Bis: "
                                type="number"
                                name="end"
                                placeholder="KW"
                                value={this.state.booking.end}
                                onChange={this.handleInput}
                                showError={this.state.validation.show}
                                errorText={this.state.validation.errors.end}
                            />

                            <InputValidationField
                                label=""
                                type="number"
                                name="endYear"
                                placeholder="Jahr"
                                value={this.state.booking.endYear}
                                onChange={this.handleInput}
                                showError={this.state.validation.show}
                                errorText={this.state.validation.errors.endYear}
                            />

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

                            <label>Zusatzkosten (Punkte):</label>
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