import React from 'react';


const propTypes = {};

const defaultProps = {};
import styles from './booking.css'
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api'
import { isLoggedIn, getUser, getToken } from '../../services/auth';
import Modal from '../../components/modal/modal';

let descr;
let maxPeople;
let points;
let startKW;
let endKW;
let diff;

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
        this.state ={

            customer: {},

            points: '',

            fewo: {
                name: '',
                id: ''
            },

            description: '',
            numberOfPeopleAllowed: '',
            picture: '',
            start:'',
            end:'',

            modalIsOpen: false


        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount(){

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
                    points: data.totalScore


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

        //Bild und Beschreibung
        api.get('/apartments/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            console.log(data);

            descr = data.description;
            // maxPeople = data.numberOfPeopleAllowed;


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
                picture:'data:image/png;base64,' + data._embedded.images[0].image,



            });
        });
    }

    handleStart(event){

        this.setState({start: event.target.value});
        startKW = event.target;

        //if(endKW != null)

    }

///TODO wenn komplett gelöscht wird auch ais SeasonRepository.java findFactorIdBySeason löschen
    handleEnd(event){

        this.setState({end: event.target.value});
        endKW = event.target;

        startKW=1;//TODO Testwert

        diff = endKW-startKW;

        switch (diff){//TODO ? funktion auslagern, cases wg. faktor id
            case 0:
                break;
            case (1 || (-1)):
                diff = 1;
                break;
            case (2 || (-2)):
                diff = 2;
                break;
            case (3 || (-3)):
                diff = 3;
                break;
            default:
                //TODO error ausgeben?
                break;
        }

        //TODO wie Zugriff? ID ist Fewo name, brauch ich nur für beschreibung, factor für Preiskalkulation



        api.get('seasons/search/findFactorIdBySeason', {
            params: {
                start: endKW
            }
        }).then(({data})=>{
            console.log(data);

            // return api.get('factors/search/findFactorByFactoryId', {//TODO repository einstellen
            //     params: {
            //         //TODO suchwert
            //     }
            // }).then(({data})=>{
            //     console.log(data);
            // });

        });


    }

    handleSubmit(event) {
        event.preventDefault();



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

    }

    handleInput(event) {//TODO nach Testen required auf true
        let {name, value} = event.target;

        this.setState((prev) => update(prev, {
            customer: {
                [name]: {
                    $set: value
                }
            }
        }));
    }

    clearInputs() {

        this.refs.numberOfPeopleInput.value = '';
        this.refs.animalsInput.value = '';
        this.refs.childrenInput.value = '';
        this.refs.startInput.value = '';
        this.refs.endInput.value = '';
        this.refs.costsInput.value = '';
        this.refs.additionalCostsInput.style.value = '';
        this.setState( {
            customer: {
                numberOfPeople: '',
                animals: '',
                children: '',
                start: '',
                end: '',
                costs: '',
                additionalCosts:''
            }
        });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
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
                        <form onSubmit={this.handleSubmit} onReset={this.clearInputs}>
                            <label>
                                Anzahl Personen:
                            </label> {/*TODO max funktioniert nicht, wie begrenzen oder später fehler melden max={this.state.numberOfPeople}*/}
                            <input required={false} className={globalStyles.input} name="numberOfPeople" value={this.state.numberOfPeople}
                                   ref="numberOfPeopleInput" type="number" min={1}  onChange={this.handleInput}/><br />
                            <label>
                                Tiere:
                            </label>
                            <input className={globalStyles.input} name="animals" value={this.state.animals}
                                   ref="animalsInput" type="checkbox" onChange={this.handleInput}/><br />
                            <label>
                                Kinder:
                            </label>
                            <input className={globalStyles.input} name="children" value={this.state.children}
                                   ref="childrenInput" type="checkbox" onChange={this.handleInput}/><br />
                            <label>
                                Von (KW):
                            </label>
                            <input required={false} className={globalStyles.input} name="start" value={this.state.start}
                                   ref="startInput" type="number" min={1} max={52} onChange={this.handleStart}/><br />
                            <label>
                                Bis (KW):
                            </label>
                            <input required={false} className={globalStyles.input} name="end" value={this.state.end}
                                   ref="endInput" type="number" min={1} max={52} onChange={this.handleEnd}/><br />

                            <label>
                                Kosten:
                            </label>
                            <input className={globalStyles.input} name="costs" value={this.state.points}
                                   ref="costsInput" type="text"  readOnly="readOnly" onChange={this.handleInput}/><br />
                            {/*TODO ggf. ref ändern wg. Output s. a. additionalCost, on Change auch anpassen*/}

                            <label>
                                Zusatzkosten:
                            </label>
                            <input className={globalStyles.input} name="additionalCosts" value={this.state.addtionalCosts}
                                   ref="additionalCostsInput" type="text"  readOnly="readOnly" onChange={this.handleInput}/><br />

                            <button className={globalStyles.button} type="reset">
                                abbrechen
                            </button>
                            <button className={globalStyles.button} onClick={this.openModal} type="submit">
                                Buchungswunsch anmelden
                            </button>
                        </form>
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">

                        <h2 ref={subtitle => this.subtitle = subtitle}>Buchungsanfrage <br /></h2>

                        <div>Ihre Buchungsanfrage wurde übermittelt.<br />
                        </div>
                        <form>
                            <button onClick={this.closeModal}>Fenster schließen</button>
                        </form>
                    </Modal>

                </div>



            </div>

        );
    }
}

Booking.propTypes = propTypes;
Booking.defaultProps = defaultProps;

export default Booking;