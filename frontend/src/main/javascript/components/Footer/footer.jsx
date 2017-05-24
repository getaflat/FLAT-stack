import React from 'react';
import styles from './footer.css';
import globalStyles from '../../general-styles/global.css';
import Modal from '../modal/modal';


import { Link } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleRating = this.handleRating.bind(this);

    }

    handleOpenModal() {
        this.setState({isModalOpen: true});
    }

    handleCloseModal() {
        this.setState({
            isModalOpen: false
        })
    }

    handleRating() {
        // abfragen ob bereits bewertet, wenn ja dann Fehlermeldung, wenn nein, dann bewertung abschicken
    }

    render() {
        return (
            <footer className={styles.wrapper}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <div className={styles.menu}>
                    <Link className={styles.link} to="/imprint">Impressum</Link>
                    <Link className={styles.link} to="/gtc">Datenschutzbestimmungen</Link>
                </div>
                <div className={styles.button}>
                    <input className={globalStyles.button} onClick={this.handleOpenModal} type="button" value={"bewerten"}/>
                </div>
                <Modal isOpen={this.state.isModalOpen} onClose={() => this.handleCloseModal}>
                    <div className={styles.button}>
                        <h2>Bewerten sie uns!</h2>

                        <input className={globalStyles.button} type="button" onClick={this.handleCloseModal} value={"schließen"}/>
                        <input className={globalStyles.button} type="button" onClick={this.handleRating()} value={"bewerten"}/>
                    </div>
                </Modal>

            </footer>
        );
    }
}

export default Footer;