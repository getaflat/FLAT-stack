import React from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';
import auth from '../../services/auth';

import styles from './header.css';
import globalStyles from '../../general-styles/global.css';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: []
        };
    }

    componentDidMount() {
        /* api.get('/customers').then(({ data }) => {
         this.setState({ customers: data._embedded.customer });
         }); */
    }


    render() {
        return (
            <header className={styles.wrapper}>
                <div className={styles.topHeader}>
                    {/*<a className={styles.logo}>Logo</a>*/}
                    <div><img className={styles.logo} src={require("./img/logo.jpg")} alt="logo"/></div>
                    <div className={styles.topRight}>
                        <div className={styles.buttons}>
                            <Link className={globalStyles.button} to="/login">Login</Link>
                            <Link className={globalStyles.button} to="/register">Registrieren</Link>
                        </div>
                        <div className={styles.userData}>
                            <div><h3>{this.state.customer.username}TestUser</h3></div>
                            <div><input type="text" className={styles.userPoint} disabled={true} value={this.state.customer.totalScore + " P."}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <Link className={styles.tabLinks} to="/">Homepage</Link>
                    <Link className={styles.tabLinks} to="/region">Gebietsauwahl</Link>
                    <Link className={styles.tabLinks} to="/user">Dashboard</Link>
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