import React, { PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <h1>you are awesome!</h1>
                <h2>you should know...</h2>
                <p>it's time to go to sleep</p>
            </div>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;