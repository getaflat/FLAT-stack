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

              {/* <div>
                   <Link className={globalStyles.button} to="/region/Alpen">Alpen</Link>

               </div>*/}




                <div className={styles.regions}>
                <div className={styles.concreteRegion}>
                    <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                    <Link className={globalStyles.button+ ' ' + styles.button} to="/region/Komplex-Mittelmeer-1">Mittelmeer 1</Link>
                </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex-Mittelmeer-2">Mittelmeer 2</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex-Berge-1">Berge-1</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex-Nord-Ostsee-1">Nord-Ostsee-1</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src="./logo.jpg" alt="logo"/> </div>
                        <Link className={globalStyles.button} to="/region/Komplex-Mittelmeer-2">Nord-Ostsee-2</Link>
                    </div>
                </div>


            </div>


        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;