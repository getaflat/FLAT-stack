import React from 'react';
import styles from './region.css';

const propTypes = {};

const defaultProps = {};

class Region extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <h1>Gebiete</h1>
            </div>
        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;