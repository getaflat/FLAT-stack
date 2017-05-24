import React from 'react';
import styles from './region.css';
import globalStyles from '../../general-styles/global.css';
import { Link } from 'react-router-dom';


const propTypes = {};

const defaultProps = {};

class Region extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {

    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h1>Gebiete</h1>
                <Link className={styles.link} to="/region/Alpen">Alpen</Link>
            </div>
        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;