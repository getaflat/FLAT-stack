import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: []
        };
    }

    componentDidMount() {
        api.get('/customers').then(({ data }) => {
            this.setState({ customers: data._embedded.customer });
        });
    }

    render() {
        return (
            <header className={styles.wrapper}>
                <div className={styles.topHeader}>
                    <a className={styles.logo}>Logo</a>
                    <div className={styles.buttons}>
                        <button className={styles.button}>login</button>
                        <button className={styles.button}>registrieren</button>
                    </div><br />
                    <div className={styles.userData}>
                        <h3>{this.state.customer.username}TestUser</h3>
                        <input type="text" disabled={true} value={this.state.customer.totalScore + " P."} />
                    </div>
                </div>
                <div className={styles.topnav}>
                    <a><Link to="/">Startseite</Link></a>
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