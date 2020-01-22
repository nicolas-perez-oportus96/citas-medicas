import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getToken } from '../helpers/Token'
import Axios from 'axios';

class AuthComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
    }


componentDidMount() {
    const token = getToken();
    if(!token) {
        this.props.history.push('/login');
    }

    Axios.get('http://localhost:4000/api/paciente/me', {
        headers: {
            'x-access-token': token
        }
    }).then(res => this.setState({
        user: res.data
    })).catch(err => {
        localStorage.removeItem('session-token');
        this.props.history.push('/login');
    });

    console.log(this.state.user)
}

    render() {
        if (this.state.user === undefined) {
            return (
                <div>
                    <h1>Cargando...</h1>
                </div>
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthComponent);