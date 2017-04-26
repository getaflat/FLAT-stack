import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';

import api from './api';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {employees: []};
    }

    componentDidMount() {
        api.get('/employee').then(response => {
            this.setState({
                employees: response.data._embedded.employee
            })
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />

                    <table>
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
                    </table>
                </div>
            </Router>
        );
    }
}

export default App;