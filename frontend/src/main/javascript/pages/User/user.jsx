import React from 'react';
import styles from './user.css';
import api from '../../services/api';
import {isLoggedIn, getToken, getUser} from '../../services/auth';
import moment from 'moment';
import globalStyles from '../../general-styles/global.css';
import { logout } from '../../services/auth';

import { isEmptyObject, isEqual } from '../../util';

import update from 'immutability-helper';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            bookings: [],
            user: {},
            loading: true
        };

        this.handleStorno = this.handleStorno.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }


    handleChange() {
        let s = [this.refs.firstName, this.refs.lastName];

        this.setState({
            customer: this.state.user
        });

        for (let i = 0; i < s.length; i++) {
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

        for (let i = 0; i < s.length; i++) {
            s[i].disabled = true;
            s[i].style.border = "none";
            s[i].style.backgroundColor = "inherit";
        }

        this.setState({
            user: this.state.customer
        });

        this.refs.saveButton.style.display = "none";
        this.refs.cancelButton.style.display = "none";
        this.refs.editButton.style.display = "flex";
    }

    handleSave() {
        const user = this.state.user.contractNumber;

        let s = [this.refs.firstName, this.refs.lastName, this.refs.save];

        for (let i = 0; i < 2; i++) {
            s[i].disabled = true;
            s[i].style.border = "none";
            s[i].style.backgroundColor = "inherit";
        }

        this.refs.saveButton.style.display = "none";
        this.refs.cancelButton.style.display = "none";
        this.refs.editButton.style.display = "flex";

        api.get('/customers/search/updateCustomer', {
            params: {
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                contractNumber: user
            }
        }).then(() => {
            s[2].firstChild.data = "Daten erfolgreich gespeichert";
            s[2].style.display = "flex";

            setTimeout(() => {
                this.refs.save.style.display = "none";
            }, 3000);
        }).catch(() => {
            s[2].firstChild.data = "Bitte versuchen sie es später erneut";
            s[2].style.display = "flex";

            setTimeout(() => {
                this.refs.save.style.display = "none";
            }, 3000);
        });
    }


    handleInput(event) {
        let {name, value} = event.target;

        this.setState((prev) => update(prev, {
            user: {
                [name]: {
                    $set: value
                }
            }
        }));
    }

    handleStorno(event) {
        console.log(event.target);

        if (isLoggedIn()) {
            api.get(`bookings/search/deleteBooking`, {
                params: {
                    bookingId: event.target.alt
                }
            });
            window.location.reload();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (isLoggedIn() && !isEmptyObject(this.state.user) && !isEqual(this.state.user, prevState.user)) {
            api.get(`/bookings/search/findByContractNumber`, {
                params: {
                    contractNumber: this.state.user.contractNumber
                }
            }).then(({ data }) => {
                let bookings = data._embedded.bookings;

                api.get(`/apartments`).then(({ data }) => {
                    const apartments = data._embedded.apartments;
                    const booked = bookings.map((booking) => {
                        const apartment = apartments.find((apartment) => {
                            return apartment.apartmentId === booking.apartmentId;
                        });
                        const name = apartment.name;

                        return {
                            ...booking,
                            name
                        }
                    });

                    this.setState({
                       bookings: booked
                    });
                });
            });
        }
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
    }

    render() {
        if (!this.state.loading) {
            return (
                <div>
                    <div className='loading-state'>Loading...</div>
                </div>
            )
        } else {
            return (
                <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                    <div className={styles.leftDash}>
                        <div className={styles.userStats}>
                            <label>Vorname: </label>
                            <input ref="firstName" onChange={this.handleInput} name="firstName" className={styles.test1}
                                   disabled={true}
                                   value={this.state.user.firstName}/>
                            <br />
                            <label>Nachname: </label>
                            <input ref="lastName" onChange={this.handleInput} name="lastName" className={styles.test1}
                                   disabled={true}
                                   value={this.state.user.lastName}/>
                            <br />
                            <label>Vertragsnummer: </label>
                            <input ref="contractNumber" onChange={this.handleInput} className={styles.test1}
                                   disabled={true}
                                   value={this.state.user.contractNumber}/>
                            <br />
                            <label>Email-Adresse:</label>
                            <input ref="email" onChange={this.handleInput} name="email" className={styles.test1}
                                   disabled={true} value={this.state.user.email}/>
                            <br />
                            <label>Geburtsdatum:</label>
                            <input ref="birthdate" onChange={this.handleInput} name="dateOfBirth"
                                   className={styles.test1}
                                   disabled={true}
                                   value={moment(this.state.user.dateOfBirth).format('DD.MM.YYYY')}/>
                            <br />
                        </div>

                        <div className={styles.buttons}>
                            <button ref="editButton" onClick={this.handleChange} className={globalStyles.button}>
                                bearbeiten
                            </button>
                            <button ref="cancelButton" onClick={this.handleCancel}
                                    className={globalStyles.button + ' ' + styles.buttonSave}>abbrechen
                            </button>
                            <button ref="saveButton" onClick={this.handleSave}
                                    className={globalStyles.button + ' ' + styles.buttonSave}>speichern
                            </button>
                        </div>
                        <button ref="delButton" onClick={this.handleDel}
                                className={globalStyles.button}>Konto löschen
                        </button>
                        <label ref="save" className={styles.save}> </label>

                    </div>

                    <div className={styles.rightDash}>
                        <div className={styles.tgwrap}>
                            <table className={styles.tg}>
                                <tbody>
                                <tr>
                                    <th className={styles.tgyw4l}>Name (Buchung)</th>
                                    <th className={styles.tgyw4l}>Start (KW)</th>
                                    <th className={styles.tgyw4l}>Ende (KW)</th>
                                    <th className={styles.tgyw4l}>Status</th>
                                    <th className={styles.tgyw4l}>Preis (Punkte)</th>
                                    <th className={styles.tgyw4l}>Zuzahlung (in €)</th>
                                    <th className={styles.tgyw4l}>Auswahl</th>
                                </tr>
                                {this.state.bookings.map((booking, index) =>
                                    <tr key={index}>
                                        <td>{booking.name}</td>
                                        <td>{booking.week1}.{booking.year}</td>
                                        <td>{booking.week2}.{booking.year}</td>
                                        <td>{booking.status}</td>
                                        <td>{booking.price}</td>
                                        <td>{booking.additionalCharge}</td>
                                        <td className={styles.check} ref="button">
                                            <input className={globalStyles.button} alt={booking.bookingId}
                                                   value="stornieren" onClick={this.handleStorno}
                                                   type="button"/>
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
}

export default User;






