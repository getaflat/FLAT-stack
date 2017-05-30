import React from 'react';
import styles from './user.css';
import api from '../../services/api';
import {isLoggedIn, getToken, getUser} from '../../services/auth';
import Modal from '../../components/modal/modal';
import moment from 'moment';
import * as ReactDOM from "react-dom";
import globalStyles from '../../general-styles/global.css';

import update from 'immutability-helper';

const propTypes = {};
const defaultProps = {};



class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {
                email: '',
                firstname: '',
                lastname: '',
                birtdate: ''
            },
            bookings: [],
            loggedIn: {},
          //  isModalOpen: false,
        };
        this.handleStorno = this.handleStorno.bind(this);
      /*  this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModalSave = this.handleCloseModalSave.bind(this);*/
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }



  /*  handleOpenModal() {
        this.setState({isModalOpen: true});
    }

    handleCloseModal() {
        this.setState({
            isModalOpen: false,
            customer: {
                password: '',
                email: '',
                firstname: '',
                lastname: ''
            }
        })
    }*/

   /* handleCloseModalSave(event) {
        event.preventDefault();
        this.setState({showModal: false});
        let m = 0;

        if (this.state.customer.password !== '') {
            ReactDOM.findDOMNode(this.refs.passwordInput).style.borderColor = "red";
            m = 1;
        }
        if (!this.state.customer.email.includes("@") && this.state.customer.email !== '') {
            ReactDOM.findDOMNode(this.refs.emailInput).style.borderColor = "red";
            m = 1;
        }
        if (m === 1) {
            //this.clearInputs();
            return;
        }
        if (this.state.customer.firstname !== '' && this.state.customer.firstname !== this.state.loggedIn.firstName)
            this.state.loggedIn.firstName = this.state.customer.firstname;
        if (this.state.customer.lastname !== '' && this.state.customer.lastname !== this.state.loggedIn.lastName)
            this.state.loggedIn.lastName = this.state.customer.lastname;
        if (this.state.customer.email !== '' && this.state.customer.email !== this.state.loggedIn.email)
            this.state.loggedIn.email = this.state.customer.email;
        if (this.state.customer.password !== '' && this.state.customer.password !== this.state.loggedIn.password)
            this.state.loggedIn.password = this.state.customer.password;
        // abfragen was geändert wurde und das dann api.posten

        api.post('/customers', {
            contractNumber: this.state.loggedIn.contractNumber,
            email: this.state.loggedIn.email,
            firstName: this.state.loggedIn.firstName,
            lastName: this.state.loggedIn.lastName,
            password: this.state.loggedIn.password,
        }).then(() => {
            return api.get('/customers')
        }).then(({data}) => {
            this.setState({user: data._embedded.user});
        });
        // seite neu laden

    }*/

    handleChange() {
        let s = [this.refs.firstName, this.refs.lastName, this.refs.email, this.refs.birthdate];
        this.setState ({
            customer: {
                firstname: this.state.loggedIn.firstName,
                lastname: this.state.loggedIn.lastname,
                email: this.state.loggedIn.email,
            }
        });

        s[3].type = "date";
        for(let i = 0; i < s.length; i++)
        {
            s[i].disabled = false;
            s[i].style.border = "1px solid black";
            s[i].style.backgroundColor = "white";
        }
        this.refs.saveButton.style.display = "flex";
    }

    handleSave() {
        let s = [this.refs.firstName, this.refs.lastName, this.refs.email, this.refs.birthdate, this.refs.save];

        for(let i = 0; i < 4; i++)
        {
            s[i].disabled = true;
            s[i].style.border = "none";
            s[i].style.backgroundColor = "inherit";
        }
        this.refs.saveButton.style.display = "none";

        // DB zugriff
        s[3].type = "text";
        s[4].firstChild.data = "Daten erfolgreich gespeichert";
        s[4].style.display = "flex";

        setTimeout(function() {
            this.refs.save.style.display = "none";
        }.bind(this), 3000);
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

    handleStorno(event) {
        //console.log(event.target.alt);

        if (isLoggedIn()) {
            api.delete(`bookings/${event.target.alt}`).then(() => {

            }).then(() => {
                api.get('/bookings').then(({data}) => {
                    this.setState({bookings: data._embedded.bookings});
                })
            });
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
                console.log(data);
                this.setState({
                    loggedIn: data
                });
            });
            api.get('/bookings/11').then(({data}) => {
               // console.log(data._embedded.bookings);
                this.setState({
                    bookings: [data]
                })
            });
            this.state.bookings.map((booking) => {
                api.get(`/apartments/${booking.bookingId}`).then(({data}) => { // bookingId wird noch nicht rausgegeben
                    console.log(data);
                    booking.name = data.name;
                    // booking.id = data.name;
                });
            })
        }
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.leftDash}>
                    <h3>{this.state.loggedIn.username}</h3>
                    <hr />
                    <div className={styles.userStats}>
                        <label>Vorname: </label>
                        <input ref="firstName" onChange={this.handleInput} className={styles.test1} disabled={true}
                               value={this.state.loggedIn.firstName}/>
                        <br />
                        <label>Nachname: </label>
                        <input ref="lastName" onChange={this.handleInput} className={styles.test1} disabled={true}
                               value={this.state.loggedIn.lastName}/>
                        <br />
                        <label>Vertragsnummer: </label>
                        <input ref="contractNumber" onChange={this.handleInput} className={styles.test1} disabled={true} value={this.state.loggedIn.contractNumber}/>
                        <br />
                        <label>Email-Adresse:</label>
                        <input ref="email" onChange={this.handleInput} className={styles.test1} disabled={true} value={this.state.loggedIn.email}/>
                        <br />
                        <label>Geburtsdatum:</label>
                        <input ref="birthdate" onChange={this.handleInput} className={styles.test1} disabled={true} value={moment(this.state.loggedIn.dateOfBirth).format('DD.MM.YYYY')}/>
                        <br />
                    </div>

                    {/*<Modal isOpen={this.state.isModalOpen} onClose={() => this.handleCloseModal}>
                     <div className={styles.modal}>
                     <form onSubmit={this.handleCloseModalSave}>
                     <label>Vorname: </label>
                     <input value={this.state.customer.firstname} name="firstname" className={globalStyles.input}
                     onChange={this.handleInput}
                     type="text"/><br />
                     <label>Nachname: </label>
                     <input value={this.state.customer.lastname} name="lastname" className={globalStyles.input}
                     onChange={this.handleInput}
                     type="text"/><br />
                     <label>Email: </label>
                     <input value={this.state.customer.email} ref="emailInput" name="email" className={globalStyles.input}
                     onChange={this.handleInput}
                     type="text"/><br />
                     <label>Passwort: </label>
                     <input value={this.state.customer.password} ref="passwordInput" name="password" className={globalStyles.input}
                     onChange={this.handleInput}
                     type="text"/><br />
                     <button onClick={this.handleCloseModal}>abbrechen</button>
                     <button onClick={this.handleCloseModalSave}>speichern</button>
                     </form>
                     </div>
                     </Modal>*/}

                    <div className={styles.buttons}>
                        <button ref="buttonssss" onClick={this.handleChange} className={globalStyles.button}>bearbeiten</button>
                        <button ref="saveButton" onClick={this.handleSave} className={globalStyles.button +' ' + styles.buttonSave}>speichern</button>
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
                                    <td>{booking.name}</td>
                                    <td>{booking.start}</td>
                                    <td>{booking.end}</td>
                                    <td>{booking.status}</td>
                                    <td>{booking.price}</td>
                                    <td>{booking.additionalCharge}</td>
                                    <td className={styles.check} ref="button">
                                        <input className={globalStyles.button} value="stornieren" alt={booking.bookingId} onClick={this.handleStorno} type="button"/>
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






