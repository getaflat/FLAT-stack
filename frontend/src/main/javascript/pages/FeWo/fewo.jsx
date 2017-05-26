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
        this.props.history.push(`/booking/${this.props.match.path}`);
    }

    handlepictureSwap() {

    }

    componentDidMount() {
        api.get(`/apartments/search/findByName`, {
            params: {
                name: this.props.match.params.id
            }
        }).then(({data}) => {
            console.log(data);
            this.setState({
                fewo: {
                    description: 'Kinder erlaubt:' + data.infantsAllowed,
                    name: this.props.match.params.id
                }
            });
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
                    <p>{this.state.fewo.description}</p>
                </div>
                <Link className={styles.link} to={"/booking/" + this.props.match.params.id}>Testbuchung</Link>
            </div>
        );
    }
}

FeWo.propTypes = propTypes;
FeWo.defaultProps = defaultProps;

export default FeWo;
