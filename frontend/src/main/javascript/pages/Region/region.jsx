import React from 'react';

const propTypes = {};

const defaultProps = {};

class Region extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Gebiete</h1>);
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;