import React from 'react';
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
            contractnumber: '',
            email: '',
            birthdate: '',
            name: '',
            start: '',
            end: '',
            status: ''
        };

        this.handleStorno = this.handleStorno.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleStorno(event) {
        if(ReactDOM.findDOMNode(this.refs.checkbox).checked === true) {
            api.delete('/booking?name=' + this.state.name).then(({data}) => {
                this.setState({bookings: data._embedded.booking});
            });
        }
    }

    handleEdit(event) {

    }

    componentDidMount() {
        /*api.get('/user').then(({data}) => {
            this.setState({users: data._embedded.user});
        });*/

        api.get('/booking').then(({data}) => {
            this.setState({bookings: data._embedded.booking});
        });

        api.get('/user?').then(({data}) => {
            this.setState({loggedIn: data._embedded.user});
        });
        this.state.firstname = loggedIn.firstname;
        this.state.lastname = loggedIn.lastname;
        this.state.firstname = loggedIn.firstname;
        this.state.email = loggedIn.email;
        this.state.contractnumber = loggedIn.contractnumber;
    }

    render() {
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
                        <button onClick={this.handleEdit} className={styles.button}>bearbeiten</button>
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






