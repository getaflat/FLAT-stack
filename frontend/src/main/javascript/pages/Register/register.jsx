import React from 'react';
import styles from './register.css';
import api from '../../services/api';
import { register } from '../../services/auth';
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

        register({ ...this.state.customer }).then(() => {
            this.props.history.push('/user');
        }).catch((error) => {
            let message = 'Fehler, bitte versuchen sie es später erneut';

            if (error.response && error.response.status === 401) {
                message = 'Bitte überprüfen sie Ihre Angaben';
            }

            this.setState({ error: message });
        });
    }

    resetForm() {
        this.setState(this.baseState);
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
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;