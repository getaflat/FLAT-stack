import React from 'react';

import styles from './user.css';

import api from '../../services/api';

const propTypes = {};

const defaultProps = {};


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    /*scomponentDidMount() {
     api.get('/user').then({ data }) => {
     this.setState({ users: data._embedded.user });
     });
     }*/


    componentDidMount() {
        api.get('/user').then(({data}) => {
            this.setState({users: data._embedded.user});
        });
    }

    render() {
        return (
            
            <div className={styles.wrapper}>
                <div className={styles.leftDash}>
                    <div className={styles.pictureName}>
                        <img src='./picture/placeholder.png' alt="Userimage"/>
                        <h3>Username</h3>
                    </div>
                    <label>Email- Adresse: </label>
                    <label>Geburtsdatum: </label>
                    <label>Vertragsnummer: </label>
                    <div className={styles.buttons}>
                        <input type="button" value={"bearbeiten"}/>
                        <input type="button" value={"bewerten"}/>
                    </div>
                </div>

                <div className={styles.rightDash}>
                    <table className={styles.userTable}>
                        <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Geburtsdatum</th>
                        </tr>
                        {this.state.users.map((user, index) =>
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.birthdate}</td>
                                <td>{user.email}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;






