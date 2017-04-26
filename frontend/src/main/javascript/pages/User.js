import React from 'react';

const propTypes = {};

const defaultProps = {};

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Benutzer</h1>);
    }
}

User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;


// import api from './services/api';

// this.state = {employees: []};

    /* componentDidMount() {
        api.get('/employee').then(response => {
            this.setState({
                employees: response.data._embedded.employee
            })
        })
    } */

/* <table>
        <tbody>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Description</th>
            </tr>
            {this.state.employees.map((employee, index) =>
                <tr key={index}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.description}</td>
                </tr>
            )}
        </tbody>
    </table> */