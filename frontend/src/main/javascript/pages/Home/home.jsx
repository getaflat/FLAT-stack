import React from 'react';

import api from '../../services/api';
import './Home.css'
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
        alert("test");
        api.get('/apartments?').then(({ data }) => {
            this.setState({ apartments: data._embedded.apartment });
        });
    }


    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.leftStart}>
                    <img className={styles.picture} src={this.state.apartment.images} />
                    <h3>{this.state.apartment.name}</h3>
                </div>
                <div className={styles.rightStart}>
                    <h2>News</h2><br />
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                </div>

            </div>
        );
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
