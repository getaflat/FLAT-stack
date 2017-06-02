import React from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';
import { isLoggedIn, getUser, getToken } from '../../services/auth';

import styles from './header.css';
import globalStyles from '../../general-styles/global.css';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {}
        };
    }

    componentDidMount() {
        /* api.get('/customers').then(({ data }) => {
         this.setState({ customers: data._embedded.customer });
         }); */

        // const user = getUser();
        // const token = getToken();

        // console.log(token);

        /* if (user) {

        } */

        if (isLoggedIn()) {
            const token = getToken();
            const user = getUser();

            api.get(`/customers/search/findByEmail`, {
                params: {
                    email: user
                }
            }, {
                headers: {
                    authorization: token
                }
            }).then(({data}) => {
                this.setState({
                    customer: data
                });
            });
        }
    }


    render() {
        return (
            <header className={styles.wrapper}>
                <div className={styles.topHeader}>
                    {/*<a className={styles.logo}>Logo</a>*/}
                    <div> <img className={styles.logo} src={require("./img/logo.png")} alt="logo"/> </div>

                    <div className={styles.leftHeader}>

                    <div className={styles.userData}>
                        {isLoggedIn() ? (
                            <span>
                        <div><h3>{this.state.customer.username}</h3></div>
                        <div><input type="text" disabled={true} value={this.state.customer.totalScore + " P."} /></div>
                                </span>

                        ):(
                           <div></div>
                        )}
                        {/*<div><h3>{this.state.customer.username}</h3></div>
                        <div><input type="text" disabled={true} value={this.state.customer.totalScore + " P."} /></div>*/}
                    </div>
                    <br />

                    <div className={styles.buttons}>
                        {isLoggedIn() ? (
                            <Link className={globalStyles.button} to="/logout">Logout</Link>
                        ) : (
                            <span>
                                <Link className={globalStyles.button} to="/login">Login</Link>
                                <Link className={globalStyles.button} to="/register">Registrieren</Link>
                            </span>
                        )}

                    </div>

                    </div>

                </div>

                <div className={styles.tabs}>
                    <Link className={styles.tabLinks} to="/">Homepage</Link>
                    <Link className={styles.tabLinks} to="/region">Gebietsauswahl</Link>
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