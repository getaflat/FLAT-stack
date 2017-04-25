import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Home from './Home';
import Login from './Login';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>

                <hr />

                <BrowserRouter>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;