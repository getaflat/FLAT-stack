import React from 'react';

const propTypes = {};

const defaultProps = {};

class Booking extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <wrapper>
                <h1>Buchung</h1>
                <div id="FeWoT&B">Text & Bild</div>
                <div id="Buchung">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Anzahl Personen:
                            <input type="text" />
                        </label>
                        <label>
                            Tiere:
                            <input type="text" />
                        </label>
                        <label>
                            Kinder:
                            <input type="text"  />
                        </label>
                        <label>
                            Von:
                            <input type="text" />
                        </label>
                        <label>
                            Bis:
                            <input type="text" />
                        </label>
                        <button type="submit">
                            buchen
                        </button>
                        <button type="reset">
                            abbrechen
                        </button>
                    </form>
                </div>
            </wrapper>

        );
    }
}

Booking.propTypes = propTypes;
Booking.defaultProps = defaultProps;

export default Booking;