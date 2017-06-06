import React from 'react';
import styles from './booking.css'
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api'
import { isLoggedIn, getUser, getToken } from '../../services/auth';


import update from 'immutability-helper';

const propTypes = {};

const defaultProps = {};

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

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {},
            booking: {
                start: '',
                end: '',
                additionalCosts: '',
                points: ''
            },

            fewo: {
                name: '',
                id: ''
            },

            description: '',
            picture: '',
            basebooking: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.calcCost = this.calcCost.bind(this);

    }

    calcCost(event) {
        //nach Drücken des Buttons "Kosten berechnen"
        event.preventDefault();

        // TODO: Dies ist ein Hinweis und kein Todo: booking.end entspricht kw2 in DB und booking.start entspricht kw1 in DB, in DB wird nicht mehr jede KW eingetragen sondern nur noch Start- und Endwoche
        //Dauer des Aufenthalts in Fewo berechnen
        diff=this.state.booking.end-this.state.booking.start;

        //in Input-Feld max KW 52 möglich und max 4 Wochen Aufenthalt, -4 falls Aufenthalt über Jahreswechsel geht
        //TODO Buchung über Jahreswechsel überhaupt möglich? In DB ist ein Feld für Jahr. Inputfeld Jahr noch ergänzen?
        if(this.state.booking.end > 52 ||this.state.booking.start > 52||(diff)>4||(diff)<(-4))
            return;

        //Buttons werden angepasst
        this.refs.submitB.style.display = "flex";
        this.refs.calcB.style.display = "none";

        //Bei einer Woche Aufenthalt
        if(diff>=0||diff<=(0)) {

            //Factor ID suchen
            api.get('/seasons/search/findByCalenderWeek', {
                params: {
                    calenderWeek: this.state.booking.start
                }
            }).then(({data}) => {
                console.log(data);

                //Factor suchen
                return api.get('factors/search/findByFactorId', {
                    params: {
                        factorId: data.factorId
                    }
                });
            }).then(({data})=> {
                console.log(data);
                factor1 = data.factor;

                //Grundpreis Fewo suchen
                return api.get('/apartments/search/findByName', {
                    params: {
                        name: this.props.match.params.id
                    }
                });

            }).then(({data})=> {
                console.log(data);
                //TODO: ggf. Berechnung falsch, weil Variabeln nicht korrekt gesetzt
                //Berechnung der ersten Woche
                 price= data.basePrice * factor1;
            });

        }


        //Bei zwei Wochen Aufenthalt diese if-Bedingung zusätzlich ausgeführt
        if(diff>=1||diff<=(-1)) {

            //KW um 1 erhöhen
            kw2=(this.state.booking.start+1)%52;

            api.get('/seasons/search/findByCalenderWeek', {
                params: {
                    calenderWeek: kw2
                }
            }).then(({data}) => {
                console.log(data);

                return api.get('factors/search/findByFactorId', {
                    params: {
                        factorId: data.factorId
                    }
                });
            }).then(({data})=> {
                console.log(data);
                factor2 = data.factor;

                //TODO appartment muss evtl. nicht erneut gefunden werden, da bereits bei Berechnung der erster Woche gesetzt, wg. Copy'n'Paste noch drin
                return api.get('/apartments/search/findByName', {
                    params: {
                        name: this.props.match.params.id
                    }
                });

            }).then(({data})=> {
                console.log(data);
                this.state.booking.points =this.state.booking.points+ (data.basePrice * factor2);
            });

        }

        //Berechnung dritter Woche
        if(diff>=2||diff<=(-2)) {

            kw3=(this.state.booking.start+1)%52;

            api.get('/seasons/search/findByCalenderWeek', {
                params: {
                    calenderWeek: kw3
                }
            }).then(({data}) => {
                console.log(data);

                return api.get('factors/search/findByFactorId', {
                    params: {
                        factorId: data.factorId
                    }
                });
            }).then(({data})=> {
                console.log(data);
                factor3 = data.factor;

                //TODO appartment muss evtl. nicht erneut gefunden werden, da bereits bei Berechnung der erster Woche gesetzt, wg. Copy'n'Paste noch drin
                return api.get('/apartments/search/findByName', {
                    params: {
                        name: this.props.match.params.id
                    }
                });

            }).then(({data})=> {
                console.log(data);
                this.state.booking.points =this.state.booking.points+ (data.basePrice * factor3);
            });

        }

        //Berechnung vierter Woche
        if(diff>=3||diff<=(-3)) {

            kw4=(this.state.booking.start+1)%52;

            api.get('/seasons/search/findByCalenderWeek', {
                params: {
                    calenderWeek: kw4
                }
            }).then(({data}) => {
                console.log(data);

                return api.get('factors/search/findByFactorId', {
                    params: {
                        factorId: data.factorId
                    }
                });
            }).then(({data})=> {
                console.log(data);
                factor4 = data.factor;

                //TODO appartment muss evtl. nicht erneut gefunden werden, da bereits bei Berechnung der erster Woche gesetzt, wg. Copy'n'Paste noch drin
                return api.get('/apartments/search/findByName', {
                    params: {
                        name: this.props.match.params.id
                    }
                });

            }).then(({data})=> {
                console.log(data);

                //TODO Ausgabe in Punkten
                this.state.booking.points =this.state.booking.points + (data.basePrice * factor4);
            });

        }

        //TODO funktionieren ggf. auch nicht, weil Berechnung der Kosten nicht funktioniert
        //Zusatzkosten

        //Kosten höher als Guthaben (totalScore)
        if(this.state.booking.points>this.state.customer.totalScore){
            // 1 Punkt = 10 Euro, fehlende Punkte werden mit Faktor 2 = 20 Euro berechnet
            //Ausgabe in Euro
            this.state.booking.additionalCosts= (this.state.booking.points-this.state.customer.totalScore)*20
        }

    }

    componentDidMount() {

        //Sicherung der leeren Inputfelder, damit nach Klick auf den Button "abbrechen" wieder die Inputfelder geleert werden
        this.setState({
            basebooking: this.state.booking
        });

        //User
        if (isLoggedIn()) {
            const token = getToken();
            const user = getUser();

    // TODO in Konsole werden alle User bzw. Kopie eines users geladen und dadurch kann in input-Feld KW nicht sofort etwas eingetragen werde
     //TODO bei calcCost() werden auch alle User oder Kopie eines Users geladen
            api.get(`/customers/search/findByEmail`, {
                params: {
                    email: user
                }
            }, {
                headers: {
                    authorization: token
                }
            }).then(({data}) => {
                console.log(data);


                this.setState({
                    customer: data,
                });
            });
        }

        //Bild und Beschreibung und max Personenanzahl (sieht überflüssig aus, leider wird nach dem Klicken auf einen Button die Beschreibung der Fewo nicht mehr angezeigt)
        api.get('/apartments/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            console.log(data);

            descr = data.description;
            //TODO neu
            persons = data.numberOfPersons;
            rooms = data.numberOfRooms;
            size = data.size;
            children = (data.infantsAllowed ? "Ja" : "Nein");
            pets = (data.animalsAllowed ? "Ja" : "Nein");
            balcony = (data.hasBalcony ? "Ja" : "Nein");
            //TODO neu ende

            this.setState({

                fewo: {
                    name: data.name,
                    id: data.apartmentId
                }

            });

            return api.get('/images/search/findByApartmentId', {
                params: {
                    apartmentId: data.apartmentId
                }
            })
        }).then(({ data }) => {
            console.log(data);
            this.setState({
                picture:'data:image/png;base64,' + data._embedded.images[0].image
            });
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        //TODO hier geht gar nix mit der DB :-(
        //TODO Buchungsanfrage übermitteln, ich hab mir hier ein Beispiel überlegt, das jedoch komplett falsch sein kann
        //Beispiel


        //TODO in BookingRepository.java habe ich ein maxBooking angelegt, jedoch auskommentiert, weil ich nicht weiß, ob es funktioniert
        //höchste vergebene BookingID bekommen um sie dann um 1 zu inkrementieren, damit ich eine id für die aktuelle Buchungsanfrage habe
        /*api.get('booking/search/maxBooking')*/

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
        this.refs.submitLabel.style.display = "flex";
        setTimeout(function() {
            this.refs.submitLabel.style.display = "none";

            //dashboard weiterleiten
            this.props.history.push('/user');
        }.bind(this), 2000);

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

        //Zwischengespeicherter State nach dem die Website geladen wurde wiederherstellen
        this.setState({
           booking: this.state.basebooking
        });

        //Button anpassen
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
                        <div> <img className={styles.image} src={this.state.picture}/> </div>
                        <br/>
                        <div>
                        <h3 className={styles.heading}>{this.props.match.params.id}</h3>
                        </div>
                        <div className={styles.facts}>
                        <section>{descr}</section><br />
                        <section className={styles.detail}>Details:</section>
                        <section>Personenanzahl: {persons}</section>
                        <section>Raumanzahl: {rooms}</section>
                        <section>Größe: {size}</section>
                        <section>Balkon vorhanden: {balcony}</section>
                        <section>Tiere erlaubt: {pets}</section>
                        <section>Kinder: {children}</section>
                        </div>
                    </div>
                    <br/>
                    <div className={styles.rightBooking}>
                        <form onReset={this.clearInputs}>

                            <label>
                                Von (KW):
                            </label>
                            <input required={true} className={globalStyles.input} name="start" value={this.state.booking.start}
                                   ref="startInput" type="number" min={1} max={52} onChange={this.handleInput}/><br /><br/>
                            <label>
                                Bis (KW):
                            </label>
                            <input required={true} className={globalStyles.input} name="end" value={this.state.booking.end}
                                   ref="endInput" type="number" min={1} max={52} onChange={this.handleInput}/><br /><br/>

                            <label>
                                Kosten:
                            </label>
                            <input className={globalStyles.input + ' ' + styles.cost} name="points" value={this.state.booking.points}
                                   ref="costsInput" type="text"  readOnly="readOnly" onChange={this.handleInput}/><br /><br/>

                            <label>
                                Zusatzkosten:
                            </label>
                            <input className={globalStyles.input + ' ' + styles.cost} name="additionalCosts" value={this.state.booking.addtionalCosts}
                                   ref="additionalCostsInput" type="text"  readOnly="readOnly" onChange={this.handleInput}/><br /><br/>

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

Booking.propTypes = propTypes;
Booking.defaultProps = defaultProps;

export default Booking;