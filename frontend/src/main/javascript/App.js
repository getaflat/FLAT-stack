import React, { PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

class App extends React.Component {
	constructor(props) {
		super(props);
	}

    render() {
        return (<h1>Hello World!</h1>);
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;