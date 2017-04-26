import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <ul>
                    <li><Link to="/">Startseite</Link></li>
                    <li><Link to="/booking">Buchung</Link></li>
                    <li><Link to="/gtc">AGB</Link></li>
                    <li><Link to="/imprint">Impressum</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/region">Gebiete</Link></li>
                    <li><Link to="/register">Registrieren</Link></li>
                    <li><Link to="/user">Dashboard</Link></li>
                </ul>
                <hr />
            </header>
        );
    }
}

export default Header;