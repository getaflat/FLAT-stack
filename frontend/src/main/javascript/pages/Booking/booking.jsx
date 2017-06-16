import React from 'react';
import styles from './booking.css'
import globalStyles from '../../general-styles/global.css';
import axios from 'axios';
import api from '../../services/api'
import { isLoggedIn, getUser, getToken } from '../../services/auth';
import { isEmptyObject, isEqual, imageBlobToBase64 } from '../../util';

import update from 'immutability-helper';

//TODO ich hab hier noch ein paar Variabeln angelegt, diese können gelöscht, geändert oder ignoriert werden
let descr;
let maxPeople;
let points;
let startKW;
let endKW;
let diff;
let price;
let price1;
let price2;
let price3;
let price4;
let kw1;
let kw2;
let kw3;
let kw4;
let factor1;
let factor2;
let factor3;
let factor4;
let missingPoints;
let persons;
let rooms;
let size;
let children;
let pets;
let balcony;

export default class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {},
            booking: {
                start: '',
                startYear: '',
                end: '',
                endYear: '',
                additionalCosts: '',
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
            factors: []
        };

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

        //Bild und Beschreibung und max Personenanzahl (sieht überflüssig aus, leider wird nach dem Klicken auf einen Button die Beschreibung der Fewo nicht mehr angezeigt)
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
                return accumulator + apartment.basePrice * (factor/100)
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
    }

    handleSubmit(event) {

        event.preventDefault();

        //TODO hier geht gar nix mit der DB :-(
        //TODO Buchungsanfrage übermitteln, ich hab mir hier ein Beispiel überlegt, das jedoch komplett falsch sein kann
        //Beispiel


        //TODO in BookingRepository.java habe ich ein maxBooking angelegt, jedoch auskommentiert, weil ich nicht weiß, ob es funktioniert
        //höchste vergebene BookingID bekommen um sie dann um 1 zu inkrementieren, damit ich eine id für die aktuelle Buchungsanfrage habe
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
         week1: this.state.booking.start,
         week2: this.state.booking.end,
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

        //Label Bestätigung anzeigen
        /* this.refs.submitLabel.style.display = "flex";
        setTimeout(() => {
            this.refs.submitLabel.style.display = "none";

            //dashboard weiterleiten
            this.props.history.push('/user');
        }, 2000); */

    }

    handleInput(event) {
        let {name, value} = event.target;

        this.setState((prev) => update(prev, {
            booking: {
                [name]: {
                    $set: value
                }
            }
        }));
    }

    clearInputs() {
        this.setState({
           booking: this.state.basebooking
        });

        this.refs.submitB.style.display = "none";
        this.refs.calcB.style.display = "flex";
    }


    //TODO Anordnung der Buttons nach calcCost() stimmt ggf. nicht mehr
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
                            <br/>
                            <br/>

                            <label>Kosten:</label>
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

                            <label>Zusatzkosten:</label>
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