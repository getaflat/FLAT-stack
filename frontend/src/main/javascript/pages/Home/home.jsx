import React from 'react';

import api from '../../services/api';
import './Home.css'

const propTypes = {};
const defaultProps = {};

class Home extends React.Component {
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
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
    }

    componentDidMount() {
        api.get('/user').then(({ data }) => {
            this.setState({ users: data._embedded.user });
        });
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

    handleFirstName(event) {
       // this.setState({ firstName: event.target.value });
    }

    handleLastName(event) {
       // this.setState({ lastName: event.target.value });
    }

    handleDescription(event) {
      //  this.setState({ description: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>Startseite</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Vorname:
                        <input type="text" onChange={this.handleFirstName} />
                    </label>
                    <label>
                        Nachname:
                        <input type="text" onChange={this.handleLastName} />
                    </label>
                    <label>
                        Beschreibung:
                        <input type="text" onChange={this.handleDescription} />
                    </label>
                    <button type="submit">
                        Absenden
                    </button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Vorname</th>
                            <th>Nachname</th>
                            <th>Beschreibung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) => {
                            return (
                                <tr key={index}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.description}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
