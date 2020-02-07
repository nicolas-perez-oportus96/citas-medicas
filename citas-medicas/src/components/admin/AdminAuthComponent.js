import React, { Component } from 'react';
import { withRouter, Link} from 'react-router-dom';
import { getToken } from '../../helpers/Token';
import axios from 'axios';

class AdminAuthComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            centroMedico: undefined
        }
        this.logOut = this.logOut.bind(this)
    }

    componentDidMount() {
        const token = getToken();
        if(!token) {
            this.props.history.push('/adminlogin');
        }

        axios.get('http://localhost:4000/api/cm/me', {
            headers: {
                'x-access-token': token
            }
        }).then(res => this.setState({
            centroMedico: res.data
            
        })).catch(err => {
            localStorage.removeItem('session-token');
            this.props.history.push('/adminlogin');
        });
    }

    logOut() {
        localStorage.removeItem('session-token');
        this.props.history.push('/');
    }

    render() {
        if (this.state.centroMedico === undefined) {
            return (
                <div>
                    <h1>Cargando...</h1>
                </div>
            );
        }
        return (
            <div>
                 {/* NavBar */}
                 <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between sticky-top">
                    <h5><i className="far fa-user mr-1"></i>Bienvenido <button onClick={this.logOut} className="badge badge-pill badge-danger">Cerrar Sesion</button></h5>

                    <div className="centroMedico">
                        <h5><i className="far fa-hospital mr-1"></i>  </h5>
                    </div>
                </nav>

                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AdminAuthComponent);