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
import NoMatch from '../pages/NoMatch/nomatch';
import RegionFewo from '../pages/regionFewos/regionFewos'
import auth from '../services/auth';

import Header from '../components/Header/header';
import Footer from "../components/Footer/footer";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.hasToken() ? (
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
    }

    render() {
        return (
            <Router>
                <div className={styles.wrapper}>
                    <Header />

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/booking/:id" component={Booking} />
                        <Route path="/gtc" component={GTC} />
                        <Route path="/imprint" component={Imprint} />
                        <Route path="/login" component={Login} />
                        <Route path="/region/:id" component={RegionFewo} />
                        <Route path="/region" component={Region} />
                        <Route path="/register" component={Register} />
                        <PrivateRoute path="/user" component={User} />
                        <Route path="/fewo/:id" component={FeWo} />
                        <Route component={NoMatch} />
                    </Switch>

                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;