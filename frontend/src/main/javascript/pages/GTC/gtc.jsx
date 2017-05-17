import React from 'react';
import styles from './gtc.css';
import globalStyles from '../../general-styles/global.css';


const propTypes = {};

const defaultProps = {};

class GTC extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h1>Allgemeine Geschäftsbedingungen</h1>
            </div>
        );
    }
}

GTC.propTypes = propTypes;
GTC.defaultProps = defaultProps;

export default GTC;