import React from 'react';

import styles from './register.css';
import api from '../../services/api';
import * as ReactDOM from "react-dom";
import moment from 'moment';

import update from 'immutability-helper';

const propTypes = {};
const defaultProps = {};

let t;

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
        this.setState({
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
        ReactDOM.findDOMNode(this.refs.usernameInput).focus();
    }

    handleSubmit(event) {
        let m = 0;
        event.preventDefault();
        ReactDOM.findDOMNode(this.refs.usernameInput).style.border = "none";
        ReactDOM.findDOMNode(this.refs.firstnameInput).style.border = "none";
        ReactDOM.findDOMNode(this.refs.lastnameInput).style.border = "none";
        ReactDOM.findDOMNode(this.refs.birthdateInput).style.border = "none";
        ReactDOM.findDOMNode(this.refs.passwordInput).style.border = "none";
        ReactDOM.findDOMNode(this.refs.passwordrepInput).style.border = "none";
        ReactDOM.findDOMNode(this.refs.emailInput).style.border = "none";
        ReactDOM.findDOMNode(this.refs.contractnumberInput).style.border = "none";

        if (this.state.customer.password !== this.state.customer.reppassword) {
            ReactDOM.findDOMNode(this.refs.passwordInput).style.borderColor = "red";
            ReactDOM.findDOMNode(this.refs.passwordrepInput).style.borderColor = "red";
            m = 1;
        }
        if (this.state.customer.contractnumber.length !== 12) {
            ReactDOM.findDOMNode(this.refs.contractnumberInput).style.borderColor = "red";
            m = 1;
        }
        if (m === 1) {
            this.clearInputs();
            return;
        }
        api.get(`/customers/${this.state.customer.contractnumber}`).then(({data}) => {
            // let user = data;
            this.setState({contractnumberT: data.contract_number});
        }).then(() => {
            api.post('/customers', {
                contractNumber: this.state.customer.contractnumber,
                dateOfBirth: moment(this.state.customer.birthdate).format(),
                email: this.state.customer.email,
                firstName: this.state.customer.firstname,
                lastName: this.state.customer.lastname,
                password: this.state.customer.password,
                totalScore: 0,
                username: this.state.customer.username
            })
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if(error.response.status === 404) {
                    
                }
            }
        });

        /*   api.post('/customers', {
         contract_number: this.state.contractnumber,
         date_of_birth: moment(this.state.birthdate).format(),
         email: this.state.email,
         first_name: this.state.firstname,
         last_name: this.state.lastname,
         password: this.state.password,
         total_score: 0,
         username: this.state.username
         }).then(() => {
         return api.get('/customer')
         }).then(({data}) => {
         this.setState({customer: data._embedded.customer});
         });
         */
        //  console.log(this.state.contractnumber.length);
        //  console.log(moment(this.state.birthdate).format());
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
                        <label>sad
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