import React from 'react';

const propTypes = {};

const defaultProps = {};

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <wrapper>
                <h1>Registrieren</h1>
                <div id="Buchung">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                            <input type="text" />
                        </label>
                        <label>
                            Geburtsdatum:
                            <input type="text" />
                        </label>
                        <label>
                            Passwort:
                            <input type="text"  />
                        </label>
                        <label>
                            Email Adresse:
                            <input type="text" />
                        </label>
                        <label>
                            Vertragsnummer:
                            <input type="text" />
                        </label>
                        <button type="submit">
                            registrieren
                        </button>
                        <button type="reset">
                            abbrechen
                        </button>
                    </form>
                </div>
            </wrapper>
        );
    }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;