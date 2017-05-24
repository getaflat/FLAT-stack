import React from 'react';
import styles from './user.css';
import api from '../../services/api';
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
                password: '',
                email: '',
                firstname: '',
                lastname: ''
            },
            bookings: [],
            loggedIn: [],
            isModalOpen: false,
        };
        this.handleStorno = this.handleStorno.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModalSave = this.handleCloseModalSave.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleOpenModal() {
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
    }

    handleCloseModalSave(event) {
        event.preventDefault();
        this.setState({showModal: false});
        let m = 0;

        if(this.state.customer.password !== '') {
            ReactDOM.findDOMNode(this.refs.passwordInput).style.borderColor = "red";
            m = 1;
        }
        if(!this.state.customer.email.includes("@") && this.state.customer.email !== '') {
            ReactDOM.findDOMNode(this.refs.emailInput).style.borderColor = "red";
            m = 1;
        }
        if (m === 1) {
            //this.clearInputs();
            return;
        }
        if(this.state.customer.firstname !== '' && this.state.customer.firstname !== this.state.loggedIn.firstName)
            this.state.loggedIn.firstName = this.state.customer.firstname;
        if(this.state.customer.lastname !== '' && this.state.customer.lastname !== this.state.loggedIn.lastName)
            this.state.loggedIn.lastName = this.state.customer.lastname;
        if(this.state.customer.email !== '' && this.state.customer.email !== this.state.loggedIn.email)
            this.state.loggedIn.email = this.state.customer.email;
        if(this.state.customer.password !== '' && this.state.customer.password !== this.state.loggedIn.password)
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
         api.delete(`bookings/${event.target.value}`).then(() => {

         }).then(() => {
             api.get('/bookings').then(({data}) => {
                 this.setState({bookings: data._embedded.bookings});
             })
        });
    }

    componentDidMount() {
        api.get('/bookings').then(({data}) => {
            this.setState({bookings: data._embedded.bookings});
        });

        api.get(`/customers/123456789012`).then(({data}) => {
            this.setState({loggedIn: data});
        });
        this.setState({
            customer: {
                password: '',
                email: '',
                firstname: '',
                lastname: ''
            }
        });
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.leftDash}>
                    <h3>{this.state.loggedIn.username}</h3>
                    <hr />
                    <div className={styles.userStats}>
                        <label>Vorname: {this.state.loggedIn.firstName}
                        </label><br />
                        <label>Nachname: {this.state.loggedIn.lastName}
                        </label><br />
                        <label>Vertragsnummer: {this.state.loggedIn.contractNumber}123456789012 {/* wird nicht angezeigt, state beinahltet keine Vertragsnummer*/}
                        </label><br />
                        <label>Email-Adresse: {this.state.loggedIn.email}
                        </label><br />
                        <label>Geburtsdatum: {moment(this.state.loggedIn.dateOfBirth).format('DD.MM.YYYY')}
                        </label><br />
                    </div>

                    <Modal isOpen={this.state.isModalOpen} onClose={() => this.handleCloseModal}>
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
                    </Modal>

                    <div className={styles.buttons}>
                        <button onClick={this.handleOpenModal} className={globalStyles.button}>bearbeiten</button>
                    </div>

                </div>

                <div className={styles.rightDash}>
                    <div className={styles.tgwrap}>
                        <table className={styles.tg}>
                            <tbody>
                            <tr>
                                <th className={styles.tgyw4l}>Name (Buchung)</th>
                                <th className={styles.tgyw4l}>Zeitraum</th>
                                <th className={styles.tgyw4l}>Status</th>
                                <th className={styles.tgyw4l}>Auswahl</th>
                            </tr>
                            {this.state.bookings.map((booking, index) =>
                                <tr key={index}>
                                    <td>{booking.name}</td>
                                    <td>{booking.start}</td>
                                    <td>{booking.end}</td>
                                    <td>{booking.status}</td>
                                    <td className={styles.check} ref="button"><input className={globalStyles.button} value={this.state.bookings.bookingId} onClick={this.handleStorno()} type="button"/></td>
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






