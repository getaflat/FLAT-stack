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

                <div className={styles.concreteRegion}>
                <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                {/*<Link className={globalStyles.button} to="/login">Nordsee</Link>*/}
                <button value="Alpen" onClick={this.handleClick} className={globalStyles.button}>Nordsee</button>
                </div>

                <div className={styles.concreteRegion}>
                    <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                    {/*<Link className={globalStyles.button} to="/login">Ostsee</Link>*/}
                    <button value="Alpen" onClick={this.handleClick} className={globalStyles.button}>Ostsee</button>
                </div>

                <div className={styles.concreteRegion}>
                    <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                    {/*<Link className={globalStyles.button} to="/login">Italien</Link>*/}
                    <button value="Alpen" onClick={this.handleClick} className={globalStyles.button}>Italien</button>
                </div>

                <div className={styles.concreteRegion}>
                    <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                    {/*<Link className={globalStyles.button} to="/login">Mallorca</Link>*/}
                    <button value="Alpen" onClick={this.handleClick} className={globalStyles.button}>Mallorca</button>
                </div>

                <div className={styles.concreteRegion}>
                    <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                    {/*<Link className={globalStyles.button} to="/login">Schwarzwald</Link>*/}
                    <button value="Alpen" onClick={this.handleClick} className={globalStyles.button}>Schwarzwald</button>
                </div>
            </div>
        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;