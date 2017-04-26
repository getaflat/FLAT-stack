import React, { PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Server is running, horray!</h1>);
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
