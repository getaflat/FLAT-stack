import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Booking from './pages/booking/Booking';
import GTC from './pages/gtc/GTC';
import Home from './pages/home';
import Imprint from './pages/imprint/Imprint';
import Login from './pages/login/Login';
import Region from './pages/region/Region';
import Register from './pages/register/Register';
import User from './pages/user/User';
import FeWo from './pages/fewo/FeWo';

import Header from './components/header/Header';
import Footer from "./components/footer/Footer";


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />

                    <Route exact path="/" component={Home} />
                    <Route path="/booking" component={Booking} />
                    <Route path="/gtc" component={GTC} />
                    <Route path="/imprint" component={Imprint} />
                    <Route path="/login" component={Login} />
                    <Route path="/region" component={Region} />
                    <Route path="/register" component={Register} />
                    <Route path="/user" component={User} />
                    <Route path="/fewo" component={FeWo} />

                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;