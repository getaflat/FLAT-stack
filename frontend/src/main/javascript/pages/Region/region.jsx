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
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <h1>Gebiete</h1>

                <div className={styles.regions}>
                <div className={styles.concreteRegion}>
                    <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                    <Link className={globalStyles.button} to="/region/Komplex Mallorca">Mallorca</Link>
                </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex Italien">Italien</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex Berge">Berge</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex Nordsee">Nordsee</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex Ostsee">Ostsee</Link>
                    </div>
                </div>


            </div>


        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;