import React from 'react';
import styles from './user.css';
import api from '../../services/api';
import {isLoggedIn, getToken, getUser} from '../../services/auth';
import moment from 'moment';
import globalStyles from '../../general-styles/global.css';

import update from 'immutability-helper';

const propTypes = {};
const defaultProps = {};



class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            bookings: [],
            loggedIn: {},
        };
        this.handleStorno = this.handleStorno.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange() {
        let s = [this.refs.firstName, this.refs.lastName];

        this.setState ({
            customer: this.state.loggedIn
        });

        for(let i = 0; i < s.length; i++)
        {
            s[i].disabled = false;
            s[i].style.border = "1px solid black";
            s[i].style.backgroundColor = "white";
        }

        this.refs.saveButton.style.display = "flex";
        this.refs.cancelButton.style.display = "flex";
        this.refs.editButton.style.display = "none";
    }

    handleCancel() {
        let s = [this.refs.firstName, this.refs.lastName];

        for(let i = 0; i < s.length; i++)
        {
            s[i].disabled = true;
            s[i].style.border = "none";
            s[i].style.backgroundColor = "inherit";
        }
        this.setState ({
            loggedIn: this.state.customer
        });

        this.refs.saveButton.style.display = "none";
        this.refs.cancelButton.style.display = "none";
        this.refs.editButton.style.display = "flex";
    }

    handleSave() {
        const token = getToken();
        const user = this.state.loggedIn.contractNumber;
        console.log(user);

        let s = [this.refs.firstName, this.refs.lastName, this.refs.save];

        for(let i = 0; i < 2; i++)
        {
            s[i].disabled = true;
            s[i].style.border = "none";
            s[i].style.backgroundColor = "inherit";
        }
        this.refs.saveButton.style.display = "none";
        this.refs.cancelButton.style.display = "none";
        this.refs.editButton.style.display = "flex";

      /*  api.patch(`/customers/?contractNumber=${user}`, {
            first_name: this.state.loggedIn.firstName,
            last_name: this.state.loggedIn.lastName
        }).then(() => {
           console.log(arguments)
        });*/

         api.get('/customers/search/updateCustomer',
            {
                params: {
                    firstName: this.state.loggedIn.firstName,
                    lastName: this.state.loggedIn.lastName,
                    contractNumber: user
                }
            });

        s[2].firstChild.data = "Daten erfolgreich gespeichert";
        s[2].style.display = "flex";

        setTimeout(function() {
            this.refs.save.style.display = "none";
        }.bind(this), 3000);
    }


    handleInput(event) {
        let {name, value} = event.target;

        this.setState((prev) => update(prev, {
            loggedIn: {
                [name]: {
                        $set: value
                }
            }
        }));
    }

    handleStorno(event) {
        console.log(event.target);
        if (isLoggedIn()) {
            api.delete(`bookings/?contractNumber=${event.target.name}`);/*.then(() => { // TODO: Funktion, die die richtige Buchung storniert
                api.get(`/bookings/search/findByContractNumber`, {
                    params: {
                        contractNumber: this.state.loggedIn.contractNumber
                    }
                }, {
                    headers: {
                        authorization: token
                    }
                }).then(({data}) => {
                    this.setState({
                        bookings: [data]
                    })
                });
            });*/
            window.location.reload();
        }
    }

    componentDidMount() {
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

                this.setState({
                    loggedIn: data
                });

               // console.log(this.state.loggedIn);

                api.get(`/bookings/search/findByContractNumber`, {
                    params: {
                        contractNumber: this.state.loggedIn.contractNumber
                    }
                }, {
                    headers: {
                        authorization: token
                    }
                }).then(({data}) => {
                    console.log(data);
                    //let withNames = data.map

                    this.setState({
                        bookings: data._embedded.bookings
                    })
                });

                /*this.state.bookings.map((booking) => { // TODO: Name soll gesetzt werden irgendwo rein
                    api.get(`/apartments/${booking.bookingId}`).then(({data}) => { // bookingId wird noch nicht rausgegeben
                        console.log(data);

                    });
                })*/

            });



        }
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.leftDash}>
                    {/*<h3>{this.state.loggedIn.username}</h3>*/}
                    <hr />
                    <div className={styles.userStats}>
                        <label>Vorname: </label>
                        <input ref="firstName" onChange={this.handleInput} name="firstName" className={styles.test1} disabled={true}
                               value={this.state.loggedIn.firstName}/>
                        <br />
                        <label>Nachname: </label>
                        <input ref="lastName" onChange={this.handleInput} name="lastName" className={styles.test1} disabled={true}
                               value={this.state.loggedIn.lastName}/>
                        <br />
                        <label>Vertragsnummer: </label>
                        <input ref="contractNumber" onChange={this.handleInput} className={styles.test1} disabled={true} value={this.state.loggedIn.contractNumber}/>
                        <br />
                        <label>Email-Adresse:</label>
                        <input ref="email" onChange={this.handleInput} name="email" className={styles.test1} disabled={true} value={this.state.loggedIn.email}/>
                        <br />
                        <label>Geburtsdatum:</label>
                        <input ref="birthdate" onChange={this.handleInput} name="dateOfBirth" className={styles.test1} disabled={true} value={moment(this.state.loggedIn.dateOfBirth).format('DD.MM.YYYY')}/>
                        <br />
                    </div>

                    <div className={styles.buttons}>
                        <button ref="editButton" onClick={this.handleChange} className={globalStyles.button}>bearbeiten</button>
                        <button ref="cancelButton" onClick={this.handleCancel} className={globalStyles.button + ' ' + styles.buttonSave}>abbrechen</button>
                        <button ref="saveButton" onClick={this.handleSave} className={globalStyles.button + ' ' + styles.buttonSave}>speichern</button>
                    </div>
                    <label ref="save" className={styles.save}> </label>

                </div>

                <div className={styles.rightDash}>
                    <div className={styles.tgwrap}>
                        <table className={styles.tg}>
                            <tbody>
                            <tr>
                                <th className={styles.tgyw4l}>Name (Buchung)</th>
                                <th className={styles.tgyw4l}>Start</th>
                                <th className={styles.tgyw4l}>Ende</th>
                                <th className={styles.tgyw4l}>Status</th>
                                <th className={styles.tgyw4l}>Preis (Punkte)</th>
                                <th className={styles.tgyw4l}>Zuzahlung (in €)</th>
                                <th className={styles.tgyw4l}>Auswahl</th>
                            </tr>
                            {this.state.bookings.map((booking, index) =>
                                <tr key={index}>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.start}</td>
                                    <td>{booking.end}</td>
                                    <td>{booking.status}</td>
                                    <td>{booking.price}</td>
                                    <td>{booking.additionalCharge}</td>
                                    <td className={styles.check} ref="button">
                                        <input className={globalStyles.button} alt={booking.bookingId} value="stornieren" name={booking.bookingId} onClick={this.handleStorno} type="button"/>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;






