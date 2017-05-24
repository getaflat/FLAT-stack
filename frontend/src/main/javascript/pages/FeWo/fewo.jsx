import React from 'react';
import styles from './fewo.css';
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api';
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';


const propTypes = {};

const defaultProps = {};

class FeWo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fewo: {
                description: '',
                pictures: [],
                name: ''
            },
            bigpicture: '',
            picture1: '',
            picture2: '',
            picture3: ''
        };
        this.handleBooking = this.handleBooking.bind(this);
        this.handlepictureSwap = this.handlepictureSwap.bind(this);
    }

    handleBooking() {
        this.props.history.push(`/Booking/${this.props.match.path}`);
    }

    handlepictureSwap() {

    }

    componentDidMount() {
        api.get(`/apartments/${this.props.match.params.id}`).then(({data}) => {
            this.setState({fewo: data});
        });

        this.setState({
            fewo: {
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ' +
                'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo ' +
                'duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ' +
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
                'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet ' +
                'clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
            },
            name: this.props.match.params.id
        });

    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                {/* <!-- <div className={styles.images}>
                    <a><img name="" className={styles.imgBig}
                            src="http://all4phones.de/attachments/45792d1299589593-sony-ericsson-xperia-play-hintergrundbilder-sony-ericsson-xperia-play-hintergrundbilder-6-.jpg"
                            alt="Spaß in der Sonne"/></a>
                    <div className={styles.littleImages}>
                        <a><img className={styles.img}
                                src="http://www.community-oesterreich.com/wp-content/uploads/2015/06/Wallpaper-Pack-Smartphone-Tablet-Android-Apple-Notebook-Windows-03.jpg"
                                alt="Spaß in der Sonne"/></a>
                        <a><img className={styles.img} src="http://www.chip.de/ii/582228776_c282d2358e.jpg"
                                alt="Spaß in der Sonne"/></a>
                    </div>
                </div> --> */}
                <div className={styles.sliderContainer}>
                    <Slider {...settings}>
                        <div><img src="http://all4phones.de/attachments/45792d1299589593-sony-ericsson-xperia-play-hintergrundbilder-sony-ericsson-xperia-play-hintergrundbilder-6-.jpg"
                                        alt="Spaß in der Sonne"/></div>
                        <div><img src="http://all4phones.de/attachments/45792d1299589593-sony-ericsson-xperia-play-hintergrundbilder-sony-ericsson-xperia-play-hintergrundbilder-6-.jpg"
                                  alt="Spaß in der Sonne"/></div>
                        <div><img src="http://all4phones.de/attachments/45792d1299589593-sony-ericsson-xperia-play-hintergrundbilder-sony-ericsson-xperia-play-hintergrundbilder-6-.jpg"
                                  alt="Spaß in der Sonne"/></div>
                        <div><img src="http://all4phones.de/attachments/45792d1299589593-sony-ericsson-xperia-play-hintergrundbilder-sony-ericsson-xperia-play-hintergrundbilder-6-.jpg"
                                  alt="Spaß in der Sonne"/></div>
                    </Slider>
                </div>
                <br />
                <h3>{this.props.match.params.id}</h3>
                <div className={styles.FeWoDescr}>
                    <a>{this.state.fewo.description}</a>
                </div>
                <Link className={styles.link} to={"/booking/" + this.props.match.params.id}>Testbuchung</Link>
            </div>
        );
    }
}

FeWo.propTypes = propTypes;
FeWo.defaultProps = defaultProps;

export default FeWo;
