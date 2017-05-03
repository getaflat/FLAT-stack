import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Booking from './pages/Booking/Booking';
import GTC from './pages/GTC/GTC';
import Home from './pages/Home';
import Imprint from './pages/Imprint/Imprint';
import Login from './pages/Login/Login';
import Region from './pages/Region/Region';
import Register from './pages/Register/Register';
import User from './pages/User/User';
import FeWo from './pages/FeWo/FeWo';

import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";


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