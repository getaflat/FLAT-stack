import React from 'react';

import styles from './register.css';
import api from '../../services/api';
import * as ReactDOM from "react-dom";

const propTypes = {};

const defaultProps = {};

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            username: '',
            birthdate: '',
            password: '',
            email: '',
            contractnumber: '',
            firstname: '',
            lastname: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleBirthdate = this.handleBirthdate.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmailAdress = this.handleEmailAdress.bind(this);
        this.handleContractNumber = this.handleContractNumber.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }

    /*componentDidMount() {
        api.get('/user').then(({ data }) => {
            this.setState({ users: data._embedded.employee });
        });
    }*/

    handleUserName(event) {
        if(event.target.value < 5)
            ReactDOM.findDOMNode(this.refs.myInput).style.borderColor = "red";
        this.setState({username: event.target.value});
    }

    handleBirthdate(event) {
        this.setState({birthdate: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
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

    clearInputs() {
        this.setState({username: ''});
        this.setState({birthdate: ''});
        this.setState({password: ''});
        this.setState({email: ''});
        this.setState({contractnumber: ''});
        this.setState({firstname: ''});
        this.setState({lastname: ''});
        ReactDOM.findDOMNode(this.refs.usernameInput).focus();
        ReactDOM.findDOMNode(this.refs.firstnameInput).focus();
        ReactDOM.findDOMNode(this.refs.birthdateInput).focus();
        ReactDOM.findDOMNode(this.refs.passwordInput).focus();
        ReactDOM.findDOMNode(this.refs.passwordrepInput).focus();
        ReactDOM.findDOMNode(this.refs.emailInput).focus();
        ReactDOM.findDOMNode(this.refs.lastnameInput).focus();
        ReactDOM.findDOMNode(this.refs.contractnumberInput).focus();
    }

    handleChange(event) {
       /*
        if(this.state.username === "hallo") {
            textInput.style.backgroundColor = "red";
            buttonssa.style.disabled = true;
        }
        else
            textInput.style.backgroundColor = "white";*/
    }

    handleSubmit(event) {
        event.preventDefault();

        api.post('/user', {
            username: this.state.username,
            birthdate: this.state.birthdate,
            password: this.state.password,
            email: this.state.email,
            contractnumber: this.state.contractnumber
        }).then(() => {
            return api.get('/user')
        }).then(({ data }) => {
            this.setState({ user: data._embedded.user });
        });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.buchung}>
                    <h3>Registrierung</h3>
                        <form onSubmit={this.handleSubmit} onReset={this.clearInputs} action="/user">
                        <label>
                            Username:
                        </label>
                        <input className={styles.input} value={this.state.username} ref = "usernameInput" onChange={this.handleUserName} type="text" /><br />
                        <label>
                            Vorname:
                        </label>
                        <input className={styles.input} value={this.state.firstname} ref = "firstnameInput" type="text" onChange={this.handleFirstName}/><br />
                        <label>
                            Nachname:
                        </label>
                        <input className={styles.input} value={this.state.lastname} ref = "lastnameInput" type="text" onChange={this.handleLastName}/><br />
                        <label>
                            Geburtsdatum:
                        </label>
                        <input className={styles.input} value={this.state.birthdate} ref = "birthdateInput" type="date" onChange={this.handleBirthdate}/><br />
                        <label>
                            Passwort:
                        </label>
                        <input className={styles.input} value={this.state.password} ref = "passwordInput" type="password" onChange={this.handlePassword}/><br />
                        <label>
                            bestätigen:
                        </label>
                        <input className={styles.input} type="password" ref = "passwordrepInput" onChange={this.handlePassword}/><br />
                        <label>
                            Email Adresse:
                        </label>
                        <input className={styles.input} value={this.state.email} type="text" ref = "emailInput" onChange={this.handleEmailAdress}/><br />
                        <label>
                            Vertragsnummer:
                        </label>
                        <input className={styles.input} value={this.state.contractnumber} type="text" ref = "contractnumberInput" onChange={this.handleContractNumber}/><br />
                        <input className={styles.button} type="reset" name="abbrechen"/>
                        <button className={styles.button}>senden</button>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;