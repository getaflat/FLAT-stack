import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <hr />
                <ul>
                    <li><Link to="/imprint">Impressum</Link></li>
                    <li><Link to="/GTC">Allgemeine Geschäftsbedingungen</Link></li>
                </ul>

            </footer>
        );
    }
}

export default Footer;