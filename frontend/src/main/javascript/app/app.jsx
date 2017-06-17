import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';

import Header from '../components/Header/header';
import Footer from "../components/Footer/footer";

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

import styles from './app.css';

const RouteWithProps = ({ props, component: Component, ...rest }) => {
    const BlockAvoiding = withRouter(Component);

    return (<Route {...rest} render={(matchedProps) => (
        <BlockAvoiding {...matchedProps} {...props} />
    )} />);
};

const PrivateRouteWithProps = ({ props, component: Component, ...rest }) => {
    const BlockAvoiding = withRouter(Component);

    return (<Route {...rest} render={(matchedProps) => (
        isLoggedIn() ? (
            <BlockAvoiding {...matchedProps} {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )} />);
};

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleUserChange = this.handleUserChange.bind(this);

        this.state = { user: {} };
    }

    componentDidMount() {
        this.fetchUserData();
    }

    handleUserChange() {
        this.fetchUserData();
    }

    fetchUserData() {
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

                        <PrivateRouteWithProps path="/user" component={User} props={{ user }} />
                        <RouteWithProps path="/booking/:id" component={Booking} props={{ user }} />
                        <RouteWithProps path="/register" component={Register} props={{ onUserChange: this.handleUserChange }} />
                        <RouteWithProps path="/login" component={Login} props={{ user, onUserChange: this.handleUserChange }} />
                        <RouteWithProps path="/logout" component={Logout} props={{ onUserChange: this.handleUserChange }} />

                        <Route path="/region/:id" component={RegionFewo} />
                        <Route path="/region" component={Region} />
                        <Route path="/fewo/:id" component={FeWo} />

                        <Route path="/gtc" component={GTC} />
                        <Route path="/imprint" component={Imprint} />
                    </Switch>

                    <Footer user={user} />
                </div>
            </Router>
        );
    }
}