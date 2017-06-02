import React from 'react';
import styles from './footer.css';
import globalStyles from '../../general-styles/global.css';
import Modal from '../modal/modal';
import ReactStars from 'react-stars';
import api from '../../services/api';
import {getToken, getUser} from '../../services/auth';



import { Link } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            stars: '',
            ratingText: '',
            contractNumber: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    ratingChanged (newRating)
    {
        console.log(newRating);
        this.state.stars = newRating;
    }

    handleText(event)
    {
        this.state.ratingText = event.target.value;
    }

    handleRating()
    {
        console.log(this.state.stars + ' ' + this.state.ratingText);


        api.post('/ratings/', {
            contractNumber: this.state.contractnumber,
            score: this.state.stars,
            comment: this.state.ratingText
        });

        this.setState({
            isModalOpen: false
        });
    }

    handleOpenModal()
    {
        this.setState({isModalOpen: true});
    }

    handleCloseModal()
    {
        this.setState({
            isModalOpen: false
        });
        this.state.ratingText = '';
    }

    componentDidMount() {
        const token = getToken();
        const user = getUser();
        let ref = this.refs.rate;

        api.get(`/customers/search/findByEmail`, {
            params: {
                email: user
            }
        }, {
            headers: {
                authorization: token
            }
        }).then(({data}) => {
            this.setState({
                contractNumber: data.contractNumber
            });
            api.get('/ratings/search/findByContractNumber', {
                params: {
                    contractNumber: data.contractNumber
                }
            }).catch(function (error) {
               if(error.response.status === 404) {
                   ref.style.display = "block";
               }
            });

        });
    }

    render() {
        return (
            <footer className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.menu}>
                    <Link className={styles.link} to="/imprint">Impressum</Link>
                    <Link className={styles.link} to="/gtc">Datenschutzbestimmungen</Link>
                </div>
                    <input ref="rate" className={globalStyles.button + ' ' + styles.button} onClick={this.handleOpenModal} type="button"
                           value={"bewerten"}/>


                <Modal isOpen={this.state.isModalOpen} onClose={() => this.handleCloseModal}>
                    <div className={styles.ratingContainer}>
                        <h2>Bewerten Sie unseren Service!</h2>
                        <ReactStars count={5} onChange={this.ratingChanged} size={24} color2={'#ffd700'}/>
                        <input type="text" onChange={this.handleText} />
                        <div className={styles.buttons}>
                            <button className={globalStyles.button} onClick={this.handleCloseModal}>abbrechen</button>
                            <button className={globalStyles.button} onClick={this.handleRating}>bewerten</button>
                        </div>
                    </div>
                </Modal>


            </footer>
        );
    }
}

export default Footer;