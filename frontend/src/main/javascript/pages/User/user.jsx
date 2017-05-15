import React from 'react';
import styles from './user.css';
import api from '../../services/api';
import Modal from '../../components/Modal/modal';
import moment from 'moment';

const propTypes = {};
const defaultProps = {};


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            loggedIn: [],
            name: '',
            start: '',
            end: '',
            status: '',
            isModalOpen: false,
            customer: {
                vname: '',
                nname: '',
                emaddr: '',
                bday: '',
                pw: ''
            }
        };
        this.handleStorno = this.handleStorno.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModalSave = this.handleCloseModalSave.bind(this);
        this.handlevname = this.handlevname.bind(this);
        this.handlenname = this.handlenname.bind(this);
        this.handlebday = this.handlebday.bind(this);
        this.handleemaddr = this.handleemaddr.bind(this);
        this.handlepw = this.handlepw.bind(this);
        this.handlevnum = this.handlevnum.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleOpenModal() {
        this.setState({isModalOpen: true})
    }

    handleCloseModal() {
        this.setState({isModalOpen: false})
    }

    handlevname(event) {
        this.setState({vname: event.target.value});
    }

    handlenname(event) {
        this.setState({nname: event.target.value});
    }

    handlevnum(event) {
        this.setState({vnum: event.target.value});
    }

    handleemaddr(event) {
        this.setState({emaddr: event.target.value});
    }

    handlebday(event) {
        this.setState({bday: event.target.value});
    }

    handlepw(event) {
        this.setState({pw: event.target.value});
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

    handleCloseModalSave() {
        this.setState({showModal: false});
        event.preventDefault();

        if (this.state.customer.password !== this.state.customer.reppassword || this.state.customer.password === '') {
            this.refs.passwordInput.style.borderColor = "red";
            ReactDOM.findDOMNode(this.refs.passwordrepInput).style.borderColor = "red";
            m = 1;
        }
        if(this.state.customer.username === '') {
            ReactDOM.findDOMNode(this.refs.usernameInput).style.borderColor = "red";
            m = 1;
        }
        if (this.state.customer.contractnumber.length !== 12) {
            ReactDOM.findDOMNode(this.refs.contractnumberInput).style.borderColor = "red";
            m = 1;
        }
        if(!this.state.customer.email.includes("@") && this.state.customer.email !== '') {
            ReactDOM.findDOMNode(this.refs.emailInput).style.borderColor = "red";
            m = 1;
        }
        if(moment(this.state.customer.birthdate).year() < (new Date().getFullYear()-100)) {
            ReactDOM.findDOMNode(this.refs.birthdateInput).style.borderColor = "red";
            m = 1;
        }
        if (m === 1) {
            this.clearInputs();
            return;
        }

        api.post('/customers', {
            contractNumber: this.state.customer.contractnumber,
            //dateOfBirth: moment(this.state.customer.birthdate).format(),
            dateOfBirth: this.state.customer.bday,
            email: this.state.customer.email,
            firstName: this.state.customer.firstname,
            lastName: this.state.customer.lastname,
            password: this.state.customer.password,
            username: this.state.customer.username
        }).then(() => {
            return api.get('/customers')
        }).then(({data}) => {
            this.setState({user: data._embedded.user});
        });
    }

    handleStorno(event) {
        //if(ReactDOM.findDOMNode(this.refs.checkbox).checked === true) {   // weiß nicht, welches hier besser ist
        /* if (event.target.value === true) {
         api.delete('/Booking?bookingId=' + this.state.name).then(({data}) => {
         this.setState({bookings: data._embedded.Booking});
         });
         }*/
    }

    componentDidMount() {
        api.get('/bookings').then(({data}) => {
            this.setState({bookings: data._embedded.bookings});
        });

        api.get(`/customers/123456789012`).then(({data}) => {
            // let user = data;
            this.setState({loggedIn: data});
        });
        this.state.vname = this.state.loggedIn.firstName;
        this.state.nname = this.state.loggedIn.lastName;
        this.state.bday = this.state.loggedIn.dateOfBirth;
        this.state.emaddr = this.state.loggedIn.email;
        this.state.pw = this.state.loggedIn.password;
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.leftDash}>
                    <h3>{this.state.loggedIn.username}</h3>
                    <hr />
                    <div className={styles.userStats}>
                        <label>Vorname: {this.state.loggedIn.firstName}
                        </label><br />
                        <label>Nachname: {this.state.loggedIn.lastName}
                        </label><br />
                        <label>Vertragsnummer: {this.state.contractNumber}
                        </label><br />
                        <label>Email-Adresse: {this.state.loggedIn.email}
                        </label><br />
                        <label>Geburtsdatum: {moment(this.state.loggedIn.dateOfBirth).format()}
                        </label><br />
                    </div>

                    <Modal isOpen={this.state.isModalOpen} onClose={() => this.handleCloseModal}>
                        <div className={styles.buchung}>
                            <h1>User bearbeiten</h1>
                            <form onSubmit={this.handleCloseModalSave}>
                                <label>Vorname: </label>
                                <input value={this.state.vname} name="vname" className={styles.input} onChange={this.handleInput}
                                       type="text"/><br />
                                <label>Nachname: </label>
                                <input value={this.state.nname} name="nname" className={styles.input} onChange={this.handleInput}
                                       type="text"/><br />
                                <label>Email: </label>
                                <input value={this.state.emaddr} name="emaddr" className={styles.input} onChange={this.handleInput}
                                       type="text"/><br />
                                <label>Geburtsdatum: </label>
                                <input value={this.state.bday} name="bday" className={styles.input} onChange={this.handleInput}
                                       type="text"/><br />
                                <label>Passwort: </label>
                                <input value={this.state.pw} name="pw" className={styles.input} onChange={this.handleInput}
                                       type="text"/><br />
                                <button onClick={this.handleCloseModal}>abbrechen</button>
                                <button onClick={this.handleCloseModalSave}>speichern</button>
                            </form>
                        </div>
                    </Modal>

                    <div className={styles.buttons}>
                        <button onClick={this.handleOpenModal} className={styles.button}>bearbeiten</button>
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
                                    <td className={styles.check} ref="checkbox"><input type="checkbox"/></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.buttonright}>
                        <button onClick={this.handleStorno} className={styles.button}>stornieren</button>
                    </div>
                </div>
            </div>
        );
    }
}


User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;






