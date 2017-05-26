import React from 'react';
import styles from './login.css';
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api';

//modal = Popup

const propTypes = {};

const defaultProps = {};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        api.get(`/customers${this.state.email}`).then(({data}) => {
            this.setState({loggedIn: data._embedded.user});
        });
    }

    clearInputs(event) {
        this.setState({email: ''});
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
                            E-Mail:
                        </label>
                        <input className={globalStyles.input} value={this.state.email} ref="emailInput"
                               onChange={this.handleEmail} type="text"/><br />
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
