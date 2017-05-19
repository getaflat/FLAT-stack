import React from 'react';
import styles from './region.css';
import globalStyles from '../../general-styles/global.css';


const propTypes = {};

const defaultProps = {};

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.history.push(`/regionFewo/${event.target.value}`);
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h1>Gebiete</h1>
                <button value="Alpen" onClick={this.handleClick} className={globalStyles.button + ' ' + styles.button}>buchen</button>
            </div>
        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;