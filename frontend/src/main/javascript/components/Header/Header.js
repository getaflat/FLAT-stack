import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div id="Logo">
                    <a>Logo</a>
                </div>
                <div id="header-right">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Registrieren</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/User">Dashboard</Link></li>
                        <div id="punkte">Punkteanzeige</div>
                    </ul>
                </div>
                <nav>
                    <li><Link to="/">Startseite</Link></li>
                    <li><Link to="/region">Gebiete</Link></li>
                </nav>

                <ul>
                    <li><Link to="/booking">Buchung</Link></li>
                    <li><Link to="/region">Gebiete</Link></li>
                    <li><Link to="/fewo">Ferienwohnung</Link></li>
                </ul>
                <hr />
            </header>
        );
    }
}

export default Header;