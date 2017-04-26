import React, { PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Login page</h1>);
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
