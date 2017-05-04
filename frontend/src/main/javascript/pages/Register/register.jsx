import React from 'react';

import styles from './register.css';
import api from '../../services/api';

const propTypes = {};

const defaultProps = {};

let textInput = null;
let buttonssa = null;

function MyComponent() {
    textInput.style.backgroundColor = "red";
}

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            username: '',
            birthdate: '',
            password: '',
            email: '',
            contractnumber: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleBirthdate = this.handleBirthdate.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmailAdress = this.handleEmailAdress.bind(this);
        this.handleContractNumber = this.handleContractNumber.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        api.get('/employee').then(({ data }) => {
            this.setState({ employees: data._embedded.employee });
        });
    }

    handleUserName(event) {
        alert('name: ' + this.state.username);

    }

    handleBirthdate(event) {

    }

    handlePassword(event) {

    }

    handleEmailAdress(event) {

    }

    handleContractNumber(event) {

    }

    handleChange(event) {
        this.setState({username: event.target.value});
        if(this.state.username === "hallo") {
            textInput.style.backgroundColor = "red";
            buttonssa.style.disabled = true;
        }
        else
            textInput.style.backgroundColor = "white";
    }

    handleSubmit(event) {
       // MyComponent();
        /*event.preventDefault();

        api.post('/user', {
            username: this.state.username,
            birthdate: this.state.birthdate,
            password: this.state.password,
            email: this.state.email,
            contractnumber: this.state.contractnumber
        }).then(() => {
            return api.get('/user')
        }).then(({ data }) => {
            this.setState({ user: data._embedded.employee });
        });*/
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.buchung}>
                    <form onSubmit={this.handleUserName}>
                        <label>
                            Username:
                            <input value={this.state.username} ref={(input) => { textInput = input; }} onChange={this.handleChange} type="text" />
                        </label>
                        <label>
                            Geburtsdatum:
                            <input type="text" onChange={this.handleBirthdate}/>
                        </label>

                        <label>
                            Passwort:
                            <input type="text" onChange={this.handlePassword}/>
                        </label>
                        <label>
                            Email Adresse:
                            <input type="text" onChange={this.handleEmailAdress}/>
                        </label>
                        <label>
                            Vertragsnummer:
                            <input type="text" onChange={this.handleContractNumber}/>
                        </label>

                        <div className={styles.buttons}>
                            <button type="reset">
                                abbrechen
                            </button>
                            <button type="submit" ref={(input) => { buttonssa = input; }}>
                                registrieren
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;