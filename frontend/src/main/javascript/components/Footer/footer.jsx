import React from 'react';
import styles from './footer.css';

import { Link } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div>
                    <Link to="/imprint">Impressum</Link>
                    <Link to="/GTC">Allgemeine Geschäftsbedingungen</Link>
                </div><br />
                <input className={styles.button} type="button" value={"bewerten"}/>
            </footer>
        );
    }
}

export default Footer;