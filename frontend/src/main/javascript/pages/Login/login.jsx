import React from 'react';

import update from 'immutability-helper';

import InputValidationField from '../../components/InputValidationField';

import { login } from '../../services/auth';
import { run, rule } from '../../services/validation';
import { minLength, isRequired, isEmail } from '../../services/rules';

import styles from './login.css';
import globalStyles from '../../general-styles/global.css';

const rules = [
    rule("email", "Email Adresse", isRequired, isEmail),
    rule("password", "Passwort", isRequired, minLength(5))
];

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            validation: {
                show: false,
                errors: {}
            },
            error: ''
        };

        this.state.validation.errors = run(this.state.credentials, rules);
        this.baseState = this.state;

        this.handleFieldChanged = this.handleFieldChanged.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleFieldChanged(event) {
        event.preventDefault();

        let { value, name } = event.target;
        let state = update(this.state, {
            credentials: {
                [name]: { $set: value }
            }
        });

        state.validation.errors = run(state.credentials, rules);
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

        login({ ...this.state.credentials }).then(() => {
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
                <div className={styles.login}>
                    <h3>Login</h3>
                    <form onSubmit={this.submitForm} onReset={this.resetForm}>
                        <p>
                            {this.state.error !== '' &&
                                <span className={styles.validationError}>{this.state.error}</span>
                            }
                        </p>
                        <InputValidationField
                            label="E-Mail"
                            type="text"
                            name="email"
                            placeholder="john.doe@example.com"
                            value={this.state.credentials.email}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.email}
                        />

                        <InputValidationField
                            label="Passwort"
                            type="text"
                            name="password"
                            placeholder="********"
                            value={this.state.credentials.password}
                            onChange={this.handleFieldChanged}
                            showError={this.state.validation.show}
                            errorText={this.state.validation.errors.password}
                        />

                        <button type="reset" className={globalStyles.button}>Abbrechen</button>
                        <button type="submit" className={globalStyles.button}>Anmelden</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
