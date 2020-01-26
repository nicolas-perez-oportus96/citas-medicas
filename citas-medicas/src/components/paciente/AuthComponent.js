import React, { Component } from 'react'
import { withRouter, Link} from 'react-router-dom'
import { getToken } from '../../helpers/Token'
import Axios from 'axios';

class AuthComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
        this.logOut = this.logOut.bind(this)
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

    }

    logOut() {
        localStorage.removeItem('session-token');
        this.props.history.push('/');
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
                 {/* NavBar */}
                 <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
                    <h5><i className="far fa-user mr-1"></i>Bienvenido { this.state.user.nombres } <button onClick={this.logOut} className="badge badge-pill badge-danger">Cerrar Sesion</button></h5>

                    <div className="centroMedico">
                        <h5><i className="far fa-hospital mr-1"></i> { this.state.user.centroMedico.nombre }  </h5>
                    </div>
                    <div className="botones">
                        <Link type="button" className="btn btn-outline-success" to="/newCita"> <i className="fas fa-calendar-week mr-1"></i>Solicitar Cita Medica</Link>
                        <Link className="btn btn-outline-info my-2 ml-2 my-sm-0" to="/paciente" > <i className="fas fa-info-circle mr-1"></i>Informacion Personal</Link>
                    </div>
                </nav>

                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthComponent);