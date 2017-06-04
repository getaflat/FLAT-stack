import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import styles from './app.css';

import Booking from '../pages/Booking/booking';
import GTC from '../pages/GTC/gtc';
import Home from '../pages/Home/index';
import Imprint from '../pages/Imprint/imprint';
import Login from '../pages/Login/login';
import Logout from '../pages/logout/logout';
import Region from '../pages/Region/region';
import Register from '../pages/Register/register';
import User from '../pages/User/user';
import FeWo from '../pages/FeWo/fewo';
import RegionFewo from '../pages/regionFewos/regionFewos'

import { isLoggedIn, getUser, getToken } from '../services/auth';
import api from '../services/api';

import Header from '../components/Header/header';
import Footer from "../components/Footer/footer";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )}/>
);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleUserChange = this.handleUserChange.bind(this);

        this.state = { user: {} };
    }

    handleUserChange() {
        if (isLoggedIn()) {
            const token = getToken();
            const user = getUser();

            api.get(`/customers/search/findByEmail`, {
                params: {
                    email: user
                }
            }, {
                headers: {
                    authorization: token
                }
            }).then(({data}) => {
                const user = data;
                this.setState({ user });
            });
        } else {
            this.setState({ user: {} });
        }
    }

    render() {
        const { user } = this.state;

        return (
            <Router>
                <div className={styles.wrapper}>
                    <Header user={user} />

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/booking/:id" component={Booking} />
                        <Route path="/gtc" component={GTC} />
                        <Route path="/imprint" component={Imprint} />
                        <Route path="/login"  render={(props) => <Login user={user} onUserChange={this.handleUserChange} {...props} />}/>
                        <Route path="/logut"  render={(props) => <Logout onUserChange={this.handleUserChange} {...props} />}/>
                        <Route path="/region/:id" component={RegionFewo} />
                        <Route path="/region" component={Region} />
                        <Route path="/register" component={Register} />
                        <Route path="/fewo/:id" component={FeWo} />
                        <PrivateRoute path="/user" render={(props) => <User user={user} {...props} />}/>
                    </Switch>

                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;