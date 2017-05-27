import React from 'react';
import styles from './fewo.css';
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';


const propTypes = {};

const defaultProps = {};

let descr;

class FeWo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fewo: {
                pictures: [],
                name: ''
            },
        };
    }


    componentDidMount() {
        api.get(`/apartments/search/findByName`, {
            params: {
                name: this.props.match.params.id
            }
        }).then(({data}) => {
            console.log(data);
            descr = `${data.description} 
                Personen: ${data.numberOfPersons}
                Raumanzahl: ${data.numberOfRooms}
                Größe: ${data.size}
                Kinder: ${data.infantsAllowed}
                Tiere: ${data.animalsAllowed}
                Balkon: ${data.hasBalcony}`;
            this.setState({
                fewo: {
                    name: data.name,
                    pictures: data.images
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
            slidesToScroll: 1,
            pauseOnHover: true,
            autoplay: true,
            className: styles.sliders
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
                    <p>{descr}</p>
                </div>
                <Link className={styles.link} to={"/booking/" + this.props.match.params.id}>Testbuchung</Link>
            </div>
        );
    }
}

FeWo.propTypes = propTypes;
FeWo.defaultProps = defaultProps;

export default FeWo;
