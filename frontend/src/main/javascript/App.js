import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Booking from './pages/Booking';
import GTC from './pages/GTC';
import Home from './pages/Home';
import Imprint from './pages/Imprint';
import Login from './pages/Login';
import Region from './pages/Region';
import Register from './pages/Register';
import User from './pages/User';

import Header from './components/Header';

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
                </div>
            </Router>
        );
    }
}

export default App;