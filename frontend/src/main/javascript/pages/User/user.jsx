import React from 'react';
import styles from './user.css';
import api from '../../services/api';

const propTypes = {};
const defaultProps = {};

let email = null;

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
                    <div className={styles.pictureName}>
                        <img src='https://placehold.it/300' alt="Userimage" className={styles.userPicture}/>
                        {this.state.users.map((user) =>
                            <h3>test</h3>)}
                    </div>
                    <div className={styles.userStats}>
                        {this.state.users.map((user) =>
                            <label>Vorname: {user.email} \
                            </label>)}<br />
                        {this.state.users.map((user) =>
                            <label>Nachname: {user.email} \
                            </label>)}<br />
                        {this.state.users.map((user) =>
                            <label>Vertragsnummer: {user.email} \
                            </label>)}<br />
                        {this.state.users.map((user) =>
                            <label>Email-Adresse: {user.email} \
                            </label>)}<br />
                        {this.state.users.map((user) =>
                            <label>Geburtsdatum: {user.email} \
                            </label>)}<br />
                    </div>
                    <div className={styles.buttons}>
                        <input type="button" value={"bearbeiten"}/>
                        <input type="button" value={"bewerten"} />
                    </div>
                </div>

                <div className={styles.rightDash}>
                    <table className={styles.userTable}>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Zeitraum</th>
                            <th>Status</th>
                            <th>Auswahl</th>
                        </tr>
                        {this.state.users.map((user, index) =>
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.birthdate}</td>
                                <td>{user.email}</td>
                                <td><input type="checkbox"/></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <input type="button" value={"stornieren"}/>
                </div>

            </div>
        );
    }
}

User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;






