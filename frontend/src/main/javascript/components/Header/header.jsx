import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className={styles.container}>
                <div>
                    <a>Logo</a>
                </div>


                <div className={styles.topnav}>
                    <a><Link to="/">Startseite</Link></a>
                    <a><Link to="/region">Gebiete</Link></a>
                    <a><Link to="/booking">Buchung</Link></a>
                    <a><Link to="/region">Gebiete</Link></a>
                    <a><Link to="/fewo">Ferienwohnung</Link></a>
                    <a><Link to="/login">Login</Link></a>
                    <a><Link to="/register">Registrieren</Link></a>
                    <a><Link to="/User">Dashboard</Link></a>
                </div>
            </header>
        );
    }
}

export default Header;