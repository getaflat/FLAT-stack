import React from 'react';
import styles from './imprint.css';
import globalStyles from '../../general-styles/global.css';


const propTypes = {};

const defaultProps = {};

class Imprint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>

                <h1>Impressum</h1>
                <p>
                    Thomas von Aquin <br />
                    Fantasystraße 666 <br />
                    12345 Nixtown <br /><br />

                    Telefon: 05768/12345 <br />
                    E-Mail: kontakt@nixdatown.fantasy <br /><br />

                    Verantwortlich für den Inhalt (gem. § 55 Abs. 2 RStV): <br />
                    Thomas von Aquin <br />
                    Fantasystraße 666 <br />
                    12345 Nixtown <br />
                </p>

            </div>
        );
    }
}

Imprint.propTypes = propTypes;
Imprint.defaultProps = defaultProps;

export default Imprint;