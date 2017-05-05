import React from 'react';

import styles from './register.css';
import api from '../../services/api';

const propTypes = {};

const defaultProps = {};

let textInput = null;
//let buttonssa = null;

//function MyComponent() {
 //   textInput.style.backgroundColor = "red";
//}

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

    /*componentDidMount() {
        api.get('/user').then(({ data }) => {
            this.setState({ users: data._embedded.employee });
        });
    }*/

    handleUserName(event) {
        //alert('name: ' + this.state.username);
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
        alert("name: " + this.state.username + " birt: " + this.state.birthdate + " pass: " + this.state.password + " email: " + this.state.email + " contract: " + this.state.contractnumber)
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.buchung}>
                    <form onSubmit={this.handleSubmit} action="/user">
                        <label>
                            Username:
                            <input value={this.state.username} ref={(input) => { textInput = input; }} onChange={this.handleUserName} type="text" />
                        </label>
                        <label>
                            Geburtsdatum:
                            <input value={this.state.birthdate} type="text" onChange={this.handleBirthdate}/>
                        </label>

                        <label>
                            Passwort:
                            <input value={this.state.password} type="password" onChange={this.handlePassword}/>
                        </label>
                        <label>
                            Passwort bestätigen:
                            <input value={this.state.password} type="password" onChange={this.handlePassword}/>
                        </label>
                        <label>
                            Email Adresse:
                            <input value={this.state.email} type="text" onChange={this.handleEmailAdress}/>
                        </label>
                        <label>
                            Vertragsnummer:
                            <input value={this.state.contractnumber} type="text" onChange={this.handleContractNumber}/>
                        </label>

                        <div className={styles.buttons}>
                            <input type="reset" />
                            <input type="submit"/>

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