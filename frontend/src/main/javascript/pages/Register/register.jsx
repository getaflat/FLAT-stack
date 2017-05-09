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
            customer: [],
            username: '',
            birthdate: '',
            password: '',
            reppassword: '',
            email: '',
            contractnumber: '',
            firstname: '',
            lastname: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleBirthdate = this.handleBirthdate.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRepPassword = this.handleRepPassword.bind(this);
        this.handleEmailAdress = this.handleEmailAdress.bind(this);
        this.handleContractNumber = this.handleContractNumber.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
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

    clearInputs() {
        this.setState({username: ''});
        this.setState({birthdate: ''});
        this.setState({password: ''});
        this.setState({reppassword: ''});
        this.setState({email: ''});
        this.setState({contractnumber: ''});
        this.setState({firstname: ''});
        this.setState({lastname: ''});
        ReactDOM.findDOMNode(this.refs.usernameInput).focus();
    }

    handleSubmit(event) {
        let m = 0;
        event.preventDefault();
        ReactDOM.findDOMNode(this.refs.usernameInput).style.borderColor = "black";
        ReactDOM.findDOMNode(this.refs.firstnameInput).style.borderColor = "black";
        ReactDOM.findDOMNode(this.refs.lastnameInput).style.borderColor = "black";
        ReactDOM.findDOMNode(this.refs.birthdateInput).style.borderColor = "black";
        ReactDOM.findDOMNode(this.refs.passwordInput).style.borderColor = "black";
        ReactDOM.findDOMNode(this.refs.passwordrepInput).style.borderColor = "black";
        ReactDOM.findDOMNode(this.refs.emailInput).style.borderColor = "black";
        ReactDOM.findDOMNode(this.refs.contractnumberInput).style.borderColor = "black";

        /*if(this.state.password !== this.state.reppassword) {
            this.clearInputs();
            ReactDOM.findDOMNode(this.refs.passwordInput).style.borderColor = "red";
            ReactDOM.findDOMNode(this.refs.passwordrepInput).style.borderColor = "red";
            m = 1;
        }*/
        if(this.state.username === '1000000'/* vorhanden */) {
            ReactDOM.findDOMNode(this.refs.usernameInput).style.borderColor = "red";
            m = 1;
        }
        if(this.state.contractnumber === '1000000'/* vorhanden */) {
            ReactDOM.findDOMNode(this.refs.contractnumberInput).style.borderColor = "red";
            m = 1;
        }
        if(this.state.email === '1000000'/* vorhanden */) {
            ReactDOM.findDOMNode(this.refs.emailInput).style.borderColor = "red";
            m = 1;
        }
        if(m === 1)
            return;

        alert(" : " + this.state.username + " : " + this.state.birthdate + " : " + this.state.password + " : " + this.state.email + " : " + this.state.contractnumber);
        api.post('/customer', {
            contract_number: this.state.contractnumber,
            date_of_birth: this.state.birthdate,
            email: this.state.email,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            password: this.state.password,
            total_score: 0,
            username: this.state.username
        });/*.then(() => {
            return api.get('/customer')
        }).then(({ data }) => {
            this.setState({ customer: data._embedded.customer });
        });*/
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
                        <label>sad
                            Passwort:
                        </label>
                        <input className={styles.input} value={this.state.password} ref = "passwordInput" type="password" onChange={this.handlePassword}/><br />
                        <label>
                            bestätigen:
                        </label>
                        <input className={styles.input} value={this.state.reppassword} type="password" ref = "passwordrepInput" onChange={this.handleRepPassword}/><br />
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