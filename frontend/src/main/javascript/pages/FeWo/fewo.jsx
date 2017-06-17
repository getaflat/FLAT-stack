import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { isLoggedIn } from '../../services/auth';
import { imageBlobToBase64 } from '../../util';

import styles from './fewo.css';
import globalStyles from '../../general-styles/global.css';

export default class FeWo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fewo: {
                name: '',
                id: 0,
                description: '',
                persons: 0,
                rooms: 0,
                size: 0,
                children: '',
                pets: '',
                balcony: ''
            },
            picture1: '',
            picture2: '',
            picture3: '',
        };
    }

    componentDidMount() {
        this.refs.bookingB.style.display = isLoggedIn() ? "flex" : "none";

        api.get(`/apartments/search/findByName`, {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            this.setState({
                fewo: {
                    name: data.name,
                    id: data.apartmentId,
                    description: data.description,
                    persons: data.numberOfPersons,
                    rooms: data.numberOfRooms,
                    size: data.size,
                    children: data.infantsAllowed ? "Ja": "Nein",
                    pets: data.animalsAllowed ? "Ja": "Nein",
                    balcony: data.hasBalcony ? "Ja" : "Nein"
                }
            });

            return api.get(`/images/search/findByApartmentId`, {
                params: {
                    apartmentId: this.state.fewo.id
                }
            })
        }).then(({ data }) => {
            this.setState({
                picture1: imageBlobToBase64(data._embedded.images[0].image),
                picture2: imageBlobToBase64(data._embedded.images[1].image),
                picture3: imageBlobToBase64(data._embedded.images[2].image)
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
                        <div><img className={styles.bilder} src={this.state.picture1} /></div>
                        <div><img className={styles.bilder} src={this.state.picture2} /></div>
                        <div><img className={styles.bilder} src={this.state.picture3} /></div>
                    </Slider>
                    <br />
                    <h3 className={styles.heading}>{this.props.match.params.id}</h3>
                </div>
                <div className={styles.FeWoDescr}>
                    <section>{this.state.fewo.description}</section><br />
                    <section className={styles.detail}>Details:</section>
                    <section>Personenanzahl: {this.state.fewo.persons}</section>
                    <section>Raumanzahl: {this.state.fewo.rooms}</section>
                    <section>Größe: {this.state.fewo.size}</section>
                    <section>Balkon vorhanden: {this.state.fewo.balcony}</section>
                    <section>Tiere erlaubt: {this.state.fewo.pets}</section>
                    <section>Kinder: {this.state.fewo.children}</section>
                </div>
                <div ref="bookingB" className={styles.button}>
                    <Link className={globalStyles.button + ' ' + styles.button} to={`/booking/${this.props.match.params.id}`}>buchen</Link>
                </div>
            </div>
        );
    }
}
