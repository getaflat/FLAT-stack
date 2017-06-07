import React from 'react';
import styles from './region.css';
import globalStyles from '../../general-styles/global.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { imageBlobToBase64 } from '../../util';

export default class Region extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            residentialBlocks: []
        }
    }

    componentDidMount() {
        api.get('/residential-blocks').then(({ data }) => {
            this.setState({
                residentialBlocks: data._embedded['residential-blocks']
            });
        });
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <h1>Gebiete</h1>
                <div className={styles.regions}>
                    {
                        this.state.residentialBlocks.map((residentialBlock, key) => {
                            const name = residentialBlock.name;
                            const label = name.split(' ')[1];
                            const picture = imageBlobToBase64(residentialBlock.image1);

                            return (<div className={styles.concreteRegion} key={key}>
                                <div><img className={styles.image} src={picture}/></div>
                                <br />
                                <Link className={globalStyles.button + ' ' + styles.button} to={`/region/${name}`}>{label}</Link>
                            </div>);
                        })
                    }
                </div>
            </div>
        );
    }
}