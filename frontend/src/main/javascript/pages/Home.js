import React from 'react';

import { getEmployeeByLastName } from '../services/api';

const propTypes = {};

const defaultProps = {};

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Startseite</h1>);
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
