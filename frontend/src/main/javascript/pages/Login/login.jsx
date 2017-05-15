import React from 'react';
import styles from './login.css';

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

    handleSubmit() {
        api.get('/customers?username='+this.state.username).then(({data}) => {
            this.setState({loggedIn: data._embedded.user});
        });
    }

    clearInputs(event) {
        this.setState({username: ''});
        this.setState({password: ''});
        ReactDOM.findDOMNode(this.refs.usernameInput).focus();
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.buchung}>
                    <h3>Login</h3>
                    <form onSubmit={this.handleSubmit} onReset={this.clearInputs} action="/user">
                        <label>
                            Username:
                        </label>
                        <input className={styles.input} value={this.state.username} ref="usernameInput"
                               onChange={this.handleUserName} type="text"/><br />
                        <label>
                            Passwort:
                        </label>
                        <input className={styles.input} value={this.state.password} ref="passwordInput" type="text"
                               onChange={this.handlePassword}/><br />

                        <input className={styles.button} type="reset" name="abbrechen" value="abbrechen"/>
                        {/*<button className={styles.button}>abbrechen</button>*/}
                        <button className={styles.button}>login</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
