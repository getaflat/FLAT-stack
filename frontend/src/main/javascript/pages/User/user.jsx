import React from 'react';
import styles from './user.css';
import api from '../../services/api';
import Modal from '../../components/Modal/modal';

const propTypes = {};
const defaultProps = {};


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            loggedIn: [],
            firstname: '',
            lastname: '',
            password: '',
            username: '',
            contractnumber: '',
            email: '',
            birthdate: '',
            name: '',
            start: '',
            end: '',
            status: '',
            isModalOpen: false,
            vname: '',
            nname: '',
            vnum: '',
            emaddr: '',
            bday: '',
            pw: ''
        };
        this.handleStorno = this.handleStorno.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModalSave = this.handleCloseModalSave.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleBirthdate = this.handleBirthdate.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRepPassword = this.handleRepPassword.bind(this);
        this.handleEmailAdress = this.handleEmailAdress.bind(this);
        this.handleContractNumber = this.handleContractNumber.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handlevname = this.handlevname.bind(this);
        this.handlenname = this.handlenname.bind(this);
        this.handlebday = this.handlebday.bind(this);
        this.handleemaddr = this.handleemaddr.bind(this);
        this.handlepw = this.handlepw.bind(this);
        this.handlevnum = this.handlevnum.bind(this);
    }

    handleUserName(event) {
        this.setState({username: event.target.value});
    }

    handleBirthdate(event) {
        this.setState({birthdate: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleRepPassword(event) {
        this.setState({reppassword: event.target.value});
    }

    handleEmailAdress(event) {
        this.setState({email: event.target.value});
    }

    handleContractNumber(event) {
        this.setState({contractnumber: event.target.value});
    }

    handleFirstName(event) {
        this.setState({firstname: event.target.value});
    }

    handleLastName(event) {
        this.setState({lastname: event.target.value});
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

    handleCloseModalSave() {
        this.setState({showModal: false});
        event.preventDefault();
        this.state.firstname = this.state.vname;
        this.state.lastname = this.state.nname;
        this.state.contractnumber = this.state.vnum;
        this.state.email = this.state.emaddr;
        this.state.birthdate = this.state.bday;
        this.state.password = this.state.pw;

        api.post('/Customer', {     // tabelle noch anpassen
            contract_number: this.state.contractnumber,
            date_of_birth: this.state.birthdate,
            email: this.state.email,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            password: this.state.password
        }).then(() => {
            return api.get('/Customer')
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
        api.get('/users').then(({data}) => {
            this.setState({users: data._embedded.user});
        });

        api.get('/bookings').then(({data}) => {
            this.setState({bookings: data._embedded.booking});
        });

        api.get('/customers').then(({data}) => {
            this.setState({loggedIn: data._embedded.user});
        });
        this.state.firstname = loggedIn.firstname;
        this.state.lastname = loggedIn.lastname;
        this.state.firstname = loggedIn.firstname;
        this.state.email = loggedIn.email;
        this.state.contractnumber = loggedIn.contractnumber;
        this.state.vname = this.state.firstname;
        this.state.nname = this.state.lastname;
        this.state.bday = this.state.birthdate;
        this.state.emaddr = this.state.email;
        this.state.pw = this.state.password;
        this.state.vnum = this.state.contractnumber;
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.leftDash}>
                    <h3>Wiedler</h3>
                    <hr />
                    <div className={styles.userStats}>
                        <label>Vorname: {this.state.firstname}
                        </label><br />
                        <label>Nachname: {this.state.lastname}
                        </label><br />
                        <label>Vertragsnummer: {this.state.contractnumber}
                        </label><br />
                        <label>Email-Adresse: {this.state.email}
                        </label><br />
                        <label>Geburtsdatum: {this.state.birthdate}
                        </label><br />
                    </div>

                    <Modal isOpen={this.state.isModalOpen} onClose={() => this.handleCloseModal}>
                        <div className={styles.buchung}>
                            <h1>User bearbeiten</h1>
                            <form onSubmit={this.handleCloseModalSave}>
                                <label>Vorname: </label>
                                <input value={this.state.vname} className={styles.input} onChange={this.handlevname}
                                       type="text"/><br />
                                <label>Nachname: </label>
                                <input value={this.state.nname} className={styles.input} onChange={this.handlenname}
                                       type="text"/><br />
                                <label>Vertragsnummer: </label>
                                <input value={this.state.vnum} className={styles.input} onChange={this.handlevnum}
                                       type="text"/><br />
                                <label>Email: </label>
                                <input value={this.state.emaddr} className={styles.input} onChange={this.handleemaddr}
                                       type="text"/><br />
                                <label>Geburtsdatum: </label>
                                <input value={this.state.bday} className={styles.input} onChange={this.handlebday}
                                       type="text"/><br />
                                <label>Passwort: </label>
                                <input value={this.state.pw} className={styles.input} onChange={this.handlepw}
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






