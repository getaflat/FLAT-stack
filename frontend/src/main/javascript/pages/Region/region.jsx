import React from 'react';
import styles from './region.css';
import globalStyles from '../../general-styles/global.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';


const propTypes = {};

const defaultProps = {};

class Region extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            picture1: '',
            picture2: '',
            picture3: '',
            picture4: '',
            picture5: '',
        }
    }

    componentDidMount()
    {
        api.get('/residential-blocks').then(({ data }) => {
             console.log(data);
            this.setState({
                picture1:'data:image/png;base64,' + data._embedded['residential-blocks'][0].image1,
                picture2:'data:image/png;base64,' + data._embedded['residential-blocks'][1].image1,
                picture3:'data:image/png;base64,' + data._embedded['residential-blocks'][2].image1,
                picture4:'data:image/png;base64,' + data._embedded['residential-blocks'][3].image1,
                picture5:'data:image/png;base64,' + data._embedded['residential-blocks'][4].image1,

            });
        });

    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <h1>Gebiete</h1>

                <div className={styles.regions}>
                <div className={styles.concreteRegion}>
                    <div> <img className={styles.image} src={this.state.picture1}/> </div>
                    <br />
                    <Link className={globalStyles.button + ' ' + styles.button} to="/region/Komplex Mallorca">Mallorca</Link>
                </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src={this.state.picture2}/> </div>
                        <br />
                        <Link className={globalStyles.button + ' ' + styles.button} to="/region/Komplex Italien">Italien</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src={this.state.picture3}/> </div>
                        <br />
                        <Link className={globalStyles.button + ' ' + styles.button} to="/region/Komplex Berge">Berge</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src={this.state.picture4}/> </div>
                        <br />
                        <Link className={globalStyles.button + ' ' + styles.button} to="/region/Komplex Nordsee">Nordsee</Link>
                    </div>

                    <div className={styles.concreteRegion}>
                        <div> <img className={styles.image} src={this.state.picture5}/> </div>
                        <br />
                        <Link className={globalStyles.button + ' ' + styles.button} to="/region/Komplex Ostsee">Ostsee</Link>
                    </div>
                </div>


            </div>


        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;