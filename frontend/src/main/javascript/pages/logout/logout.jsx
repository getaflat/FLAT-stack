import React from 'react';

import auth from '../../services/auth';

const propTypes = {};
const defaultProps = {};

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.removeToken();
        this.props.history.push('/');
    }

    render() {
        return (
            <p>Logging out...</p>
        );
    }
}

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default Logout;
