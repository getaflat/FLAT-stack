import React from 'react';
import styles from './booking.css'
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api'
import { isLoggedIn, getUser, getToken } from '../../services/auth';


import update from 'immutability-helper';

const propTypes = {};

const defaultProps = {};


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
///TODO customer überflüssig
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
        event.preventDefault();

        // TODO: DB abfragen mit start = kw1 &  ende =kw2
        diff=this.state.booking.end-this.state.booking.start;
        if(this.state.booking.end > 52||(diff)>4||(diff)<(-4))
            return;

        this.refs.submitB.style.display = "flex";
        this.refs.calcB.style.display = "none";

        if(diff>=0||diff<=(0)) {

            api.get('/seasons/search/findByCalenderWeek', {
                params: {
                    calenderWeek: this.state.booking.start
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
                factor1 = data.factor;
                return api.get('/apartments/search/findByName', {
                    params: {
                        name: this.props.match.params.id
                    }
                });

            }).then(({data})=> {
                console.log(data);
                 price= data.basePrice * factor1;
            });

        }

        //TODO appartment muss nicht erneut gefunden werden ggf. löschen

        if(diff>=1||diff<=(-1)) {

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
                return api.get('/apartments/search/findByName', {
                    params: {
                        name: this.props.match.params.id
                    }
                });

            }).then(({data})=> {
                console.log(data);
                this.state.booking.points =this.state.booking.points + (data.basePrice * factor4);
            });

        }

        //Zusatzkosten
        if(this.state.booking.points>this.state.customer.totalScore){
            // 1 Punkt = 10 Euro, zusätzlich Faktor 2 = 20 Euro
            this.state.booking.additionalCosts= (this.state.booking.points-this.state.customer.totalScore)*20
        }

        //Bild und Beschreibung und max Personenanzahl
        api.get('/apartments/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            console.log(data);

            descr = data.description;
            //  this.state.numberOfPeopleAllowed = data.numberOfPeopleAllowed;


            this.setState({

                fewo: {
                    name: data.name,
                    id: data.apartmentId,

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

    componentDidMount() {
        this.setState({
            basebooking: this.state.booking
        });

        //User
        if (isLoggedIn()) {
            const token = getToken();
            const user = getUser();


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

        /*api.get('/apartments/search/findByName',{
            params: {
                name: this.props.match.params.id
            }
        }).then(({data}) =>{
            console.log(data);
            descr = data.description;
            this.setState({
                fewo:{
                    name: data.name,
                    picture: data.images
                }
            });
        });*/

        //Bild und Beschreibung und max Personenanzahl
        api.get('/apartments/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            console.log(data);

            descr = data.description;

           //  this.state.numberOfPeopleAllowed = data.numberOfPeopleAllowed;

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





        //Bild und Beschreibungun
        api.get('/apartments/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            console.log(data);

            descr = data.description;
            //  this.state.numberOfPeopleAllowed = data.numberOfPeopleAllowed;

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

        //TODO An DB übermitteln
        //Beispiel
        api.post('/customers/search/updateBooking',
         {
         params: {
         contractNumber: this.state.customer.contractNumber,
         apartmentId: this.state.fewo.name,
         week1: this.state.booking.start,
         week2: this.state.booking.end
         price: this.state.booking.points,
         addtionalCharge: this.state.booking.additionalCosts
         }
         });

        /*api.get(`/booking/${this.state.booking.contractnumber}`).then(({data}) => {
            this.setState({contractnumberCurrent: data.contract_number});
        }).then(() => {
            api.post('/booking', {

                numberOfPeople: this.state.booking.numberOfPeople,
                animals: this.state.booking.animals,
                children: this.state.booking.children,
                start: this.state.booking.start,
                end: this.state.booking.end,

                // TODO get costs and additonalCosts


            });
            //TODO Bestätigung
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

        this.refs.submitLabel.style.display = "flex";
        setTimeout(function() {
            this.refs.submitLabel.style.display = "none";
            // TODO: dashboard weiterleiten
            this.props.history.push('/user');
        }.bind(this), 2000);

    }

    handleInput(event) {//TODO nach Testen required auf true
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

        //Bild und Beschreibungun
        api.get('/apartments/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            console.log(data);

            descr = data.description;
            //  this.state.numberOfPeopleAllowed = data.numberOfPeopleAllowed;

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

        this.refs.submitB.style.display = "none";
        this.refs.calcB.style.display = "flex";
    }


    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <h1>Buchung</h1>
                <div className={styles.booking}>
                    <div className={styles.leftBooking}>
                        <div> <img className={styles.image} src={this.state.picture}/> </div>
                        <h3 className={styles.heading}>{this.props.match.params.id}</h3>
                        <div>{descr}</div>
                    </div>
                    <div className={styles.rightBooking}>
                        <form onReset={this.clearInputs}>

                            <label>
                                Von (KW):
                            </label>
                            <input required={true} className={globalStyles.input} name="start" value={this.state.booking.start}
                                   ref="startInput" type="number" min={1} max={52} onChange={this.handleInput}/><br />
                            <label>
                                Bis (KW):
                            </label>
                            <input required={true} className={globalStyles.input} name="end" value={this.state.booking.end}
                                   ref="endInput" type="number" min={1} max={52} onChange={this.handleInput}/><br />

                            <label>
                                Kosten:
                            </label>
                            <input className={globalStyles.input + ' ' + styles.cost} name="points" value={this.state.booking.points}
                                   ref="costsInput" type="text"  readOnly="readOnly" onChange={this.handleInput}/><br />

                            <label>
                                Zusatzkosten:
                            </label>
                            <input className={globalStyles.input + ' ' + styles.cost} name="additionalCosts" value={this.state.booking.addtionalCosts}
                                   ref="additionalCostsInput" type="text"  readOnly="readOnly" onChange={this.handleInput}/><br />

                            <button className={globalStyles.button} type="reset">
                                abbrechen
                            </button>
                            <button ref="calcB" className={globalStyles.button + ' ' + styles.calcButton} onClick={this.calcCost}>
                                Kosten berechnen
                            </button>
                            <button ref="submitB" className={globalStyles.button + ' ' + styles.submitButton} onClick={this.handleSubmit}>
                                Buchungswunsch anmelden
                            </button>
                            <label ref="submitLabel" className={styles.bookingLabel}>Ihre Buchungsanfrage wird bearbeitet</label>
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