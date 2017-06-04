import React from 'react';

const propTypes = {};

const defaultProps = {};
import styles from './booking.css'
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api'

let descr;
class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state ={//TODO ggf. ändern
            booking: {
                numberOfPeople: '',
                animals: '',
                children: '',
                start: '',
                end: '',
                costs: '',
                additionalCosts:''

            },

            fewo:{
                name: '',
                picture:''
            }



        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount(){
        api.get('/apartments/search/findByName',{
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
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        api.get(`/booking/${this.state.booking.contractnumber}`).then(({data}) => {
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
            });

    }

    handleInput(event) {
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

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <h1>Buchung</h1>
                <div className={styles.booking}>
                    <div className={styles.leftBooking}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <div>
                            <section>{descr}</section>
                        </div>
                    </div>
                    <div className={styles.rightBooking}>
                        <form onSubmit={this.handleSubmit} onReset={this.clearInputs}>
                            {/*TODO: Fenster buchung bestätigt*/}
                            <label>
                                Anzahl Personen:
                            </label>
                            <input required={true} className={globalStyles.input} name="numberOfPeople" value={this.state.numberOfPeople}
                                   ref="numberOfPeopleInput" type="number" onChange={this.handleInput}/><br />
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
                            <input required={true} className={globalStyles.input} name="start" value={this.state.start}
                                   ref="startInput" type="number" onChange={this.handleInput}/><br />
                            <label>
                                Bis (KW):
                            </label>
                            <input required={true} className={globalStyles.input} name="end" value={this.state.end}
                                   ref="endInput" type="number" onChange={this.handleInput}/><br />
                            <label>
                                Kosten:
                            </label>
                            <input className={globalStyles.input} name="costs" value={this.state.costs}
                                   ref="costsInput" type="text" onChange={this.handleInput}/><br />
                            {/*TODO ggf. ref ändern wg. Output s. a. additionalCost, on Change auch anpassen*/}
                            <label>
                                Zusatzkosten:
                            </label>
                            <input className={globalStyles.input} name="additionalCosts" value={this.state.addtionalCosts}
                                   ref="additionalCostsInput" type="text" onChange={this.handleInput}/><br />
                            <button className={globalStyles.button} type="reset">
                                abbrechen
                            </button>
                            <button className={globalStyles.button} type="submit">
                                Buchungswunsch anmelden
                            </button>
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