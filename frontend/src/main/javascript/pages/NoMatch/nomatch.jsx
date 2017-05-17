import React from 'react';

import styles from './nomatch.css';
import globalStyles from '../../general-styles/global.css';


const propTypes = {};
const defaultProps = {};

class NoMatch extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this)
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h2>Page not found!</h2>
                <h3>...</h3>
            </div>
        );
    }
}

NoMatch.propTypes = propTypes;
NoMatch.defaultProps = defaultProps;

export default NoMatch;