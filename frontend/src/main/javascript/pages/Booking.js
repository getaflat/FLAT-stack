import React from 'react';

const propTypes = {};

const defaultProps = {};

class Booking extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Buchung</h1>);
    }
}

Booking.propTypes = propTypes;
Booking.defaultProps = defaultProps;

export default Booking;