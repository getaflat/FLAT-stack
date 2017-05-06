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
        this.state = {users: []};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        email.disabled = false;
    }

    componentDidMount() {
        api.get('/user').then(({data}) => {
            this.setState({users: data._embedded.user});
        });
    }

    render() {
        return (

            <div className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.leftDash}>
                    <h3>tWiedler</h3>
                    <hr />
                    <div className={styles.userStats}>
                            <label>Vorname: Thomas
                            </label><br />
                            <label>Nachname: Wiedler
                            </label><br />
                            <label>Vertragsnummer: 123412341234
                            </label><br />
                            <label>Email-Adresse: test@gmail.com
                            </label><br />
                            <label>Geburtsdatum: 19.11.1994
                            </label><br />
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.button}>bearbeiten</button>
                        <button className={styles.button}>bewerten</button>
                    </div>
                </div>
                <hr className={styles.invis}/>
                <div className={styles.rightDash}>

                    <div className={styles.tgwrap}>
                    <table className={styles.tg}>
                        <tr>
                            <th className={styles.tgyw4l}>Name (Buchung)</th>
                            <th className={styles.tgyw4l}>Zeitraum</th>
                            <th className={styles.tgyw4l}>Status</th>
                            <th className={styles.tgyw4l}>Auswahl</th>
                        </tr>
                        {this.state.users.map((user, index) =>
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.birthdate}</td>
                                <td>{user.email}</td>
                                <td className={styles.check}><input type="checkbox"/></td>
                            </tr>
                        )}
                    </table>
                    </div>
                    <div className={styles.buttonright}>
                    <button className={styles.button}>stornieren</button>
                    </div>
                </div>
            </div>
        );
    }
}

User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;






