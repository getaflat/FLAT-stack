import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import styles from './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: []
        };

        //this.handleLogin== this.handleLogin.bind(this);
    }

    componentDidMount() {
        api.get('/customers').then(({ data }) => {
            this.setState({ customers: data._embedded.customer });
        });
    }

    /*handleLogin(event){
     <Route path="/" component={Login} />
     }*/

    render() {
        return (
            <header className={styles.wrapper}>
                <div className={styles.topHeader}>
                    {/*<a className={styles.logo}>Logo</a>*/}
                    <div> <img className={styles.logo} src="./logo.jpg" alt="logo"/> </div>
                    <div className={styles.buttons}>
                        <Link className={styles.button} to="/login">Login</Link>
                        <Link className={styles.button} to="/register">Registrieren</Link>
                        {/*<button className={styles.button} >login</button>*/}
                        {/*<input className={styles.button} type="button" name="login" onClick="/login" component={Login} />*/}
                        {/*<button className={styles.button}>registrieren</button>*/}
                    </div><br />
                    <div className={styles.userData}>
                        <div><h3>{this.state.customer.username}TestUser</h3></div>
                        <div><input type="text" disabled={true} value={this.state.customer.totalScore + " P."} /></div>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <Link className={styles.button} to="/">Homepage</Link>
                    <Link className={styles.button} to="/region">Gebietsauwahl</Link>
                    <Link className={styles.button} to="/User">Dashboard</Link>
                </div>

                {/*<div className={styles.topnav}>
                    <Link to="/">Startseite</Link>
                    <Link to="/booking">Buchung</Link>
                    <Link to="/region">Gebiete</Link>
                    <Link to="/fewo">Ferienwohnung</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registrieren</Link>
                    <Link to="/User">Dashboard</Link>
                </div>*/}
            </header>
        );
    }
}

export default Header;