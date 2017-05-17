import React from 'react';

const propTypes = {};

const defaultProps = {};
import styles from './booking.css'
import globalStyles from '../../general-styles/global.css';


class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <h1>Buchung</h1>
                <div className={styles.leftBooking}>Text & Bild</div>
                <div className={styles.rightBooking}>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Anzahl Personen:
                        </label>
                        <input type="text" /><br />
                        <label>
                            Tiere:
                        </label>
                        <input type="text" /><br />
                        <label>
                            Kinder:
                        </label>
                        <input type="text"  /><br />
                        <label>
                            Von:
                        </label>
                        <input type="text" /><br />
                        <label>
                            Bis:
                        </label>
                        <input type="text" /><br />
                        <button className={globalStyles.button} type="submit">
                            abbrechen
                        </button>
                        <button className={globalStyles.button} type="reset">
                            buchen
                        </button>
                    </form>
                </div>
            </div>

        );
    }
}

Booking.propTypes = propTypes;
Booking.defaultProps = defaultProps;

export default Booking;