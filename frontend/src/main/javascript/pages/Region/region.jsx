import React from 'react';
import styles from './region.css';
import globalStyles from '../../general-styles/global.css';


const propTypes = {};

const defaultProps = {};

class Region extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h1>Gebiete</h1>
            </div>
        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;