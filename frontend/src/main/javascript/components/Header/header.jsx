import React from 'react';
import { Link } from 'react-router-dom';

import { isLoggedIn } from '../../services/auth';
import { isEmptyObject } from '../../util';

import styles from './header.css';
import globalStyles from '../../general-styles/global.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        });
    }

    render() {
        return (
            <header className={styles.wrapper}>
                <div className={styles.topHeader}>
                    <div>
                        <img className={styles.logo} src={require("./img/logo.png")} alt="logo"/>
                    </div>
                    <div className={styles.leftHeader}>
                        <div className={styles.userData}>
                            {isLoggedIn() && !isEmptyObject(this.state.user) ? (
                                <span>
                                    <div><h3>{this.state.user.firstName + ' ' + this.state.user.lastName}</h3></div>
                                    <div><input type="text" disabled={true} value={this.state.user.totalScore + " P."} /></div>
                                </span>
                            ) : (
                               <div></div>
                            )}
                        </div>
                        <br />
                        <div className={styles.buttons}>
                            {isLoggedIn() && !isEmptyObject(this.state.user) ? (
                                <Link className={globalStyles.button + ' ' + styles.button} to="/logout">Logout</Link>
                            ) : (
                                <span>
                                    <Link className={globalStyles.button + ' ' + styles.button} to="/login">Login</Link>
                                    <Link className={globalStyles.button + ' ' + styles.button} to="/register">Registrieren</Link>
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
            </header>
        );
    }
}