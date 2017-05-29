import React from 'react';

import { logout } from '../../services/auth';

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        logout().then(() => {
            this.props.history.push('/');
        }).catch(() => {
            console.log(arguments);
        });
    }

    render() {
        return (
            <p>Logge aus...</p>
        );
    }
}

export default Logout;
