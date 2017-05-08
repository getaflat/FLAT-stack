import React from 'react';
import Modal from 'react-modal';
import styles from './user.css';
import api from '../../services/api';

const propTypes = {};
const defaultProps = {};

let email = null;

/*
 {this.state.users.map((user) =>
 <label>Geburtsdatum: {user.email} \
 </label>)}<br />
 */

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            loggedIn: [],
            firstname: '',
            lastname: '',
            password: '',
            contractnumber: '',
            email: '',
            birthdate: '',
            name: '',
            start: '',
            end: '',
            status: '',
            showModal: false
        };

        this.handleStorno = this.handleStorno.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModalSave = this.handleCloseModalSave.bind(this);
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleCloseModalSave() {
        this.setState({showModal: false});
        event.preventDefault();

        api.post('/Customer', {     // tabelle noch anpassen
            username: this.state.username,
            birthdate: this.state.birthdate,
            password: this.state.password,
            email: this.state.email,
            contractnumber: this.state.contractnumber
        }).then(() => {
            return api.get('/Customer')
        }).then(({ data }) => {
            this.setState({ user: data._embedded.user });
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

componentDidMount()
{
    /*api.get('/user').then(({data}) => {
     this.setState({users: data._embedded.user});
     });*/

    /*api.get('/booking').then(({data}) => {
        this.setState({bookings: data._embedded.booking});
    });*/

    /*api.get('/customer').then(({data}) => {
        this.setState({loggedIn: data._embedded.user});
    });*/
   /* this.state.firstname = loggedIn.firstname;
    this.state.lastname = loggedIn.lastname;
    this.state.firstname = loggedIn.firstname;
    this.state.email = loggedIn.email;
    this.state.contractnumber = loggedIn.contractnumber;*/
}

render()
{
    return (

        <div className={styles.wrapper}>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <div className={styles.leftDash}>
                <h3>tWiedler</h3>
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
                <div className={styles.buttons}>
                    <button onClick={this.handleOpenModal} className={styles.button}>bearbeiten</button>
                </div>
                <ReactModal isOpen={this.state.showModal} contentLabel="bearbeiten der user Daten">
                    <form onSubmit={this.handleSubmit} action="/user">
                        <label>Vorname: </label>
                        <input value={this.state.firstname} type="text"/>
                        <label>Nachname: </label>
                        <input value={this.state.lastname} type="text"/>
                        <label>Vertragsnummer: </label>
                        <input value={this.state.contractnumber} type="text"/>
                        <label>Email: </label>
                        <input value={this.state.email} type="text"/>
                        <label>Geburtsdatum: </label>
                        <input value={this.state.birthdate} type="text"/>
                        <label>Passwort: </label>
                        <input value={this.state.password} type="text"/>
                        <button onClick={this.handleCloseModal}>abbrechen</button>
                        <button onClick={this.handleCloseModalSave}>speichern</button>
                    </form>
                </ReactModal>
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
                        /*{this.state.bookings.map((booking, index) =>
                            <tr key={index}>
                                <td>{booking.name}</td>
                                <td>{booking.start}</td>
                                <td>{booking.end}</td>
                                <td>{booking.status}</td>
                                <td className={styles.check} ref="checkbox"><input type="checkbox"/></td>
                            </tr>
                        )}*/
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






