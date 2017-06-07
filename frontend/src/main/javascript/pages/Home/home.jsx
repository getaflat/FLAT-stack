import React from 'react';

import api from '../../services/api';

import styles from './home.css';
import globalStyles from '../../general-styles/global.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureStart: ''
        }

    }

    componentDidMount() {
        api.get('/images/search/findByApartmentId', {
            params: {
                apartmentId: (Math.floor(Math.random() * 14) + 1)
            }
        }).then(({ data }) => {
            this.setState({
                pictureStart: 'data:image/png;base64,' + data._embedded.images["0"].image,
            });
        });
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <div className={styles.leftStart}>
                    <img className={styles.image} src={this.state.pictureStart} />
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
