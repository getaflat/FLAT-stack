import React from 'react';
import styles from './error.css';

const propTypes = {};

const defaultProps = {};

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.dir(this);

        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }
}

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;