import React from 'react';
import styles from './login.css';
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api';
import auth from '../../services/auth';

//modal = Popup

const propTypes = {};

const defaultProps = {};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }

    handleUserName(event) {
        this.setState({username: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        api.post(`/login`, {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            if (response.status === 200 && response.headers.authorization) {
                auth.storeToken(response.headers.authorization);
                this.props.history.push('/');
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error.message);
        });


    }

    clearInputs(event) {
        this.setState({username: ''});
        this.setState({password: ''});
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.login}>
                    <h3>Login</h3><br />
                    <form onSubmit={this.handleSubmit} onReset={this.clearInputs} action="/user">
                        <label>
                            Email:
                        </label>
                        <input className={globalStyles.input} value={this.state.username} ref="usernameInput"
                               onChange={this.handleUserName} type="text"/><br />
                        <label>
                            Passwort:
                        </label>
                        <input className={globalStyles.input} value={this.state.password} ref="passwordInput" type="text"
                               onChange={this.handlePassword}/><br />

                        <input className={globalStyles.button} type="reset" name="abbrechen" value="abbrechen"/>
                        <button className={globalStyles.button}>login</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
