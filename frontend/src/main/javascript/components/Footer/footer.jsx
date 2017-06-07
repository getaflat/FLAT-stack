import React from 'react';
import { Link } from 'react-router-dom';

import Modal from '../modal/modal';
import ReactStars from 'react-stars';
import api from '../../services/api';
import { isLoggedIn } from '../../services/auth';
import { isEmptyObject } from '../../util';

import styles from './footer.css';
import globalStyles from '../../general-styles/global.css';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            stars: '',
            ratingText: '',
            contractNumber: '',
            user: this.props.user
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    ratingChanged(newRating) {
        this.setState({
            stars: newRating
        });
    }

    handleText(event) {
        this.setState({
            ratingText: event.target.value
        });
    }

    handleRating() {
        api.get('/ratings/search/postRating', {
            params: {
                comment: this.state.ratingText,
                score: this.state.stars,
                contractNumber: this.state.contractNumber
            }
        });

        this.refs.Heading.firstChild.data = "Vielen Dank für Ihre Bewertung!";
        this.refs.rate.style.display = "none";
        this.refs.Text.style.display = "none";
        this.refs.Buttons.style.display = "none";
        this.refs.Stars.style.display = "none";

        setTimeout(() => {
            this.setState({
                isModalOpen: false
            });
        }, 1800);
    }

    handleOpenModal() {
        this.refs.rate.style.display = "none";
        this.setState({
            isModalOpen: true
        });
    }

    handleCloseModal() {
        this.refs.rate.style.display = "block";
        this.setState({
            isModalOpen: false,
            ratingText: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });
    }

    componentDidUpdate() {
        if (isLoggedIn() && !isEmptyObject(this.state.user)) {
            api.get('/ratings/search/findByContractNumber', {
                params: {
                    contractNumber: this.state.user.contractNumber
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    this.refs.rate.style.display = "block";
                }
            });
        }
    }

    render() {
        return (
            <footer className={styles.wrapper}>
                <div className={styles.menu}>
                    <Link className={styles.link} to="/imprint">Impressum</Link>
                    <Link className={styles.link} to="/gtc">Datenschutzbestimmungen</Link>
                </div>

                <input ref="rate" className={globalStyles.button + ' ' + styles.button} onClick={this.handleOpenModal} type="button"
                           value={"bewerten"}/>


                <Modal isOpen={this.state.isModalOpen} onClose={() => this.handleCloseModal}>
                    <div className={styles.ratingContainer}>
                        <h2 ref="Heading">Bewerten Sie unseren Service!</h2>
                        <div ref="Stars">
                            <ReactStars count={5} onChange={this.ratingChanged} size={24} color2={'#ffd700'}/>
                        </div>
                        <input ref="Text" type="text" onChange={this.handleText} />
                        <div ref="Buttons" className={styles.buttons}>
                            <button className={globalStyles.button} onClick={this.handleCloseModal}>abbrechen</button>
                            <button className={globalStyles.button} onClick={this.handleRating}>bewerten</button>
                        </div>
                    </div>
                </Modal>


            </footer>
        );
    }
}