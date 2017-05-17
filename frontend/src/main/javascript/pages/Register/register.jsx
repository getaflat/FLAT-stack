import React from 'react';
import styles from './register.css';
import api from '../../services/api';
import * as ReactDOM from "react-dom";
import moment from 'moment';
import globalStyles from '../../general-styles/global.css';

import update from 'immutability-helper';

const propTypes = {};
const defaultProps = {};

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {
                username: '',
                birthdate: '',
                password: '',
                reppassword: '',
                email: '',
                contractnumber: '',
                firstname: '',
                lastname: ''
            },
            contractnumberT: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        let {name, value} = event.target;

        this.setState((prev) => update(prev, {
            customer: {
                [name]: {
                    $set: value
                }
            }
        }));
    }

    clearInputs() {

        this.refs.usernameInput.value = '';
        this.refs.firstnameInput.value = '';
        this.refs.lastnameInput.value = '';
        this.refs.birthdateInput.value = '';
        this.refs.passwordInput.value = '';
        this.refs.passwordrepInput.value = '';
        this.refs.emailInput.style.value = '';
        this.refs.contractnumberInput.value = '';
        this.setState( {
            customer: {
                username: '',
                birthdate: '',
                password: '',
                reppassword: '',
                email: '',
                contractnumber: '',
                firstname: '',
                lastname: ''
            }
        });
       // ReactDOM.findDOMNode(this.refs.usernameInput).focus();
    }

    handleSubmit(event) {
        let m = 0;
        let input = this.refs.contractnumberInput;
        event.preventDefault();
        this.refs.usernameInput.style.border = "1px solid";
        this.refs.firstnameInput.style.border = "1px solid";
        this.refs.lastnameInput.style.border = "1px solid";
        this.refs.birthdateInput.style.border = "1px solid";
        this.refs.passwordInput.style.border = "1px solid";
        this.refs.passwordrepInput.style.border = "1px solid";
        this.refs.emailInput.style.border = "1px solid";
        this.refs.contractnumberInput.style.border = "1px solid";

        if (this.state.customer.password !== this.state.customer.reppassword || this.state.customer.password === '') {
            this.refs.passwordInput.style.borderColor = "red";
            ReactDOM.findDOMNode(this.refs.passwordrepInput).style.borderColor = "red";
            m = 1;
        }
        if(this.state.customer.username === '') {
            ReactDOM.findDOMNode(this.refs.usernameInput).style.borderColor = "red";
            m = 1;
        }
        if (this.state.customer.contractnumber.length !== 12) {
            ReactDOM.findDOMNode(this.refs.contractnumberInput).style.borderColor = "red";
            m = 1;
        }
        if(!this.state.customer.email.includes("@") && this.state.customer.email !== '') {
            ReactDOM.findDOMNode(this.refs.emailInput).style.borderColor = "red";
            m = 1;
        }
        if(moment(this.state.customer.birthdate).year() < (new Date().getFullYear()-100)) {
            ReactDOM.findDOMNode(this.refs.birthdateInput).style.borderColor = "red";
            m = 1;
        }
        if (m === 1) {
            this.clearInputs();
            return;
        }

        api.get(`/customers/${this.state.customer.contractnumber}`).then(({data}) => {
            this.setState({contractnumberT: data.contract_number});
        }).then(() => {
            api.post('/customers', {
                contractNumber: this.state.customer.contractnumber,
                //dateOfBirth: moment(this.state.customer.birthdate).format(),
                dateOfBirth: this.state.customer.birthdate,
                email: this.state.customer.email,
                firstName: this.state.customer.firstname,
                lastName: this.state.customer.lastname,
                password: this.state.customer.password,
                totalScore: 0,
                username: this.state.customer.username
            });
            this.props.history.push('/User');
        }).catch(
            function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if(error.response.status === 404) {
                    input.style.borderColor = "red";
                    alert("Vertragsnummer nicht in Datenbank gefunden, bitte überprüfen");
                }
            }
        });
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.buchung}>
                    <h3>Registrierung</h3>
                    <form onSubmit={this.handleSubmit} onReset={this.clearInputs} action="/User">
                        <label>
                            Username:*
                        </label>
                        <input className={styles.input} name="username" value={this.state.username} ref="usernameInput"
                               onChange={this.handleInput} type="text"/><br />
                        <label>
                            Vorname:
                        </label>
                        <input className={styles.input} name="firstname" value={this.state.firstname}
                               ref="firstnameInput" type="text" onChange={this.handleInput}/><br />
                        <label>
                            Nachname:
                        </label>
                        <input className={styles.input} name="lastname" value={this.state.lastname} ref="lastnameInput"
                               type="text" onChange={this.handleInput}/><br />
                        <label>
                            Geburtsdatum:
                        </label>
                        <input className={styles.input} name="birthdate" value={this.state.birthdate}
                               ref="birthdateInput" type="date" onChange={this.handleInput}/><br />
                        <label>
                            Passwort:*
                        </label>
                        <input className={styles.input} name="password" value={this.state.password} ref="passwordInput"
                               type="password" onChange={this.handleInput}/><br />
                        <label>
                            bestätigen:*
                        </label>
                        <input className={styles.input} name="reppassword" value={this.state.reppassword}
                               type="password" ref="passwordrepInput" onChange={this.handleInput}/><br />
                        <label>
                            Email Adresse:
                        </label>
                        <input className={styles.input} name="email" value={this.state.email} type="text"
                               ref="emailInput" onChange={this.handleInput}/><br />
                        <label>
                            Vertragsnummer:*
                        </label>
                        <input className={styles.input} name="contractnumber" value={this.state.contractnumber}
                               type="text" ref="contractnumberInput" onChange={this.handleInput}/><br />
                        <input className={globalStyles.button} type="reset" name="abbrechen"/>
                        <button className={globalStyles.button}>senden</button>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;