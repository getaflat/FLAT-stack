import React from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';
import styles from './home.css';

const propTypes = {};
const defaultProps = {};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apartment: []
        };

    }

    componentDidMount() {
        // alert("test");
        api.get('/customers/12345678901').then(({ data }) => {
            console.log(data);
            this.setState({ apartments: data._embedded.apartment });
        }).catch((err) => {
            console.log(err.response)
        });
    }


    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.leftStart}>
                    <img className={styles.picture} src={this.state.apartment.images} />
                    <h3>{this.state.apartment.name}Foto aus DB</h3>
                </div>
                <div className={styles.rightStart}>
                    <br />
                    <h2>Alpenregion Karwendel</h2>
                    <p>
                        Die Alpenregion Karwendel rund um Mittenwald, Krün und Wallgau bietet Ihnen Abwechslung mit unzähligen
                        Freizeitmöglichkeiten und ist eine der vielseitigsten Urlaubsregionen in Bayern. Die schönste Aussicht
                        genießen Sie im neuen Komplex Schönwetterblick. Exclusiv bei uns.
                        <br />
                        <br />
                        Buchbar ab August 2017.
                    </p>
                    <br />

                    <h2>Neue Website!</h2>
                    <p>
                        Wir haben unseren Internetauftritt neu gestaltet. Jetzt ist so einfach wie noch nie auch über
                        Ihr Smartphone bequem eine Ferienwohung zu buchen.
                    </p>
                    <br />

                    <h2>Sonnige Weihnachten auf Mallorca</h2>
                    <p>
                        Weihnachten der besonderen Art können Sie dieses Jahr zum Special-Preis am Strand auf der sonnigen Insel Mallorca verbringen.
                        Der neu renovierte Komplex San Cristo in exklusiver Lage können Sie nur über uns buchen.
                        <br />
                        <br />
                        Buchen Sie bis zum 31. Dezember 2016 und Sie erhalten automatisch 24 % der Punkte als Bonus 01. Januar 2017 gutgeschrieben.
                        So kann da neue Jahr beginnen!
                    </p>
                    <br />
                </div>

            </div>
        );
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
