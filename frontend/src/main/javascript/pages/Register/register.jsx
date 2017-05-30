import React from 'react';
import styles from './register.css';
import api from '../../services/api';
import * as ReactDOM from "react-dom";
import moment from 'moment';
import globalStyles from '../../general-styles/global.css';

import InputValidationField from '../../components/InputValidationField';

import update from 'immutability-helper';

import { run, rule } from '../../services/validation';
import { mustMatch, maxAge, isEmail, minAge, exactLength, minLength, isRequired } from '../../services/rules';

const rules = [
    rule("firstName", "Vorname"),
    rule("lastName", "Nachname"),
    rule("dateOfBirth", "Geburtsdatum", isRequired, minAge(18), maxAge(100)),
    rule("password", "Passwort", isRequired, mustMatch("passwordMatch", "wiederholtem Passwort")),
    rule("passwordMatch", "Passwort...", isRequired),
    rule("email", "Email Adresse", isRequired, isEmail),
    rule("contractNumber", "Vertragsnummer", isRequired, exactLength(12))
];



class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                password: '',
                passwordMatch: '',
                email: '',
                contractNumber: ''
            },
            validation: {
                show: false,
                errors: {}
            },
            error: ''
        };

        this.state.validation.errors = run(this.state.customer, rules);
        this.baseState = this.state;

        this.handleFieldChanged = this.handleFieldChanged.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        // let date = moment();

        /* console.log();

         console.log(moment(date).format());
         console.log(moment(date).subtract(18, 'years').format());
         console.log(moment(date).subtract(100, 'years').format()); */
    }

    handleFieldChanged(event) {
        event.preventDefault();

        let { value, name } = event.target;
        let state = update(this.state, {
            customer: {
                [name]: { $set: value }
            }
        });

        state.validation.errors = run(state.customer, rules);
        state.error = '';

        this.setState(state);
    }

    submitForm(event) {
        event.preventDefault();

        this.setState((prev) => update(prev, {
            validation: {
                show: { $set: true }
            }
        }));

        if (Object.keys(this.state.validation.errors).length !== 0) {
            return null;
        }

        console.log(this.state);

        /* login({ ...this.state.credentials }).then(() => {
            this.props.history.push('/user');
        }).catch((error) => {
            let message = 'Fehler, bitte versuchen sie es später erneut';

            if (error.response && error.response.status === 401) {
                message = 'Bitte überprüfen sie Ihre Angaben';
            }

            this.setState({ error: message });
        }); */
    }

    resetForm() {
        this.setState(this.baseState);
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

    handleSubmit(event) {
        let m = 0;
        let input = this.refs.contractnumberInput;
        event.preventDefault();
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
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.buchung}>
                    <h3>Registrierung</h3>
                    <form onSubmit={this.submitForm} onReset={this.resetForm}>
                        <p>
                            {this.state.error !== '' &&
                                <span className={globalStyles.validationError}>{this.state.error}</span>
                            }
                        </p>

                        <InputValidationField
                            label="Vorname"
                            type="text"
                            name="firstName"
                            placeholder="John"
                            value={this.state.customer.firstName}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.firstName}
                        />

                        <InputValidationField
                            label="Nachname"
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            value={this.state.customer.lastName}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.lastName}
                        />

                        <InputValidationField
                            label="Geburtsdatum"
                            type="date"
                            name="dateOfBirth"
                            /* placeholder="Doe" */
                            value={this.state.customer.dateOfBirth}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.dateOfBirth}
                        />

                        <InputValidationField
                            label="Passwort"
                            type="text"
                            name="password"
                            placeholder="******"
                            value={this.state.customer.password}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.password}
                        />

                        <InputValidationField
                            label="Passwort wiederholen"
                            type="text"
                            name="passwordMatch"
                            placeholder="******"
                            value={this.state.customer.passwordMatch}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.passwordMatch}
                        />

                        <InputValidationField
                            label="E-Mail Adresse"
                            type="text"
                            name="email"
                            placeholder="john@doe.com"
                            value={this.state.customer.email}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.email}
                        />

                        <InputValidationField
                            label="Vertragsnummer"
                            type="text"
                            name="contractNumber"
                            placeholder="123456789101"
                            value={this.state.customer.contractNumber}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.contractNumber}
                        />

                        <button type="reset" className={globalStyles.button}>Abbrechen</button>
                        <button type="submit" className={globalStyles.button}>Registrieren</button>

                        {/* <!-- <label>
                            Vorname:
                        </label>
                        <input className={globalStyles.input} name="firstname" value={this.state.firstname}
                               ref="firstnameInput" type="text" onChange={this.handleInput}/><br />




                        <label>
                            Nachname:
                        </label>
                        <input className={globalStyles.input} name="lastname" value={this.state.lastname} ref="lastnameInput"
                               type="text" onChange={this.handleInput}/><br />
                        <label>
                            Geburtsdatum:
                        </label>
                        <input required={true} className={globalStyles.input} name="birthdate" value={this.state.birthdate}
                               ref="birthdateInput" type="date" onChange={this.handleInput}/><br />
                        <label>
                            Passwort:*
                        </label>
                        <input required={true} className={globalStyles.input} name="password" value={this.state.password} ref="passwordInput"
                               type="password" onChange={this.handleInput}/><br />
                        <label>
                            bestätigen:*
                        </label>
                        <input required={true} className={globalStyles.input} name="reppassword" value={this.state.reppassword}
                               type="password" ref="passwordrepInput" onChange={this.handleInput}/><br />
                        <label>
                            Email Adresse:*
                        </label>
                        <input required={true} className={globalStyles.input} name="email" value={this.state.email} type="text"
                               ref="emailInput" onChange={this.handleInput}/><br />
                        <label>
                            Vertragsnummer:*
                        </label>
                        <input required={true} className={globalStyles.input} name="contractnumber" value={this.state.contractnumber}
                               type="text" ref="contractnumberInput" onChange={this.handleInput}/><br />
                        <input className={globalStyles.button} type="reset" name="abbrechen"/>
                        <button className={globalStyles.button}>senden</button> --> */}
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;