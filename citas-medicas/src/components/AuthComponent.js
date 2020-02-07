import React, { Component } from 'react'
import { withRouter, Link} from 'react-router-dom'
import { getToken } from '../helpers/Token'
import Axios from 'axios';

const jwt = require('jsonwebtoken');

class AuthComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            admin: false,
            user: undefined
        }
        this.logOut = this.logOut.bind(this)
        this.getPaciente = this.getPaciente.bind(this)
        this.getCm = this.getCm.bind(this)
    }

    async getPaciente(token) {
        await Axios.get('http://localhost:4000/api/paciente/me', {
            headers: {
                'x-access-token': token
            }})
            
        .then(user => 
            this.setState({
                user: user.data
            }))

        .catch(err => {
            localStorage.removeItem('session-token');
            this.props.history.push('/adminlogin');
            this.setState({
                admin: undefined
            })
        });
    }

    async getCm(token){
        await Axios.get('http://localhost:4000/api/cm/me', {
            headers: {
                'x-access-token': token
            }})
        .then(user => 
            this.setState({
                user: user.data
            }))
        .catch(err => {
            localStorage.removeItem('session-token');
            this.props.history.push('/login');
            this.setState({
                admin: undefined
            })
        });
    }

    async componentDidMount() {
        const token = getToken();
        if(!token) {
            this.props.history.push('/login');
        } else if(token != null){
            const decode =  jwt.decode(token)

            if (decode.admin === true){
                this.setState({
                    admin: true
                })
                this.getCm(token)
            }

            if(decode.admin === false) {
                this.setState({
                    admin: false
                })
                this.getPaciente(token)
            }
        }
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

        if (this.state.admin) {
            return (
                <div>
                     {/* NavBar */}
                     <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between sticky-top">
                        <h5><i className="far fa-user mr-1"></i>Bienvenido Administrador <button onClick={this.logOut} className="badge badge-pill badge-danger">Cerrar Sesion</button></h5>
    
                        <div className="centroMedico">
                            <h5><i className="far fa-hospital mr-1"></i> {this.state.user.nombre_cm} </h5>
                        </div>
                        <div className="botones">
                            <Link className="btn btn-outline-info my-2 ml-2 my-sm-0" to="/micentro" > <i className="fas fa-info-circle mr-1"></i>Informacion Centro Medico</Link>
                        </div>
                    </nav>
    
                    {this.props.children}
                </div>
            )
        } else if (!this.state.admin){
            return (
                <div>
                     {/* NavBar */}
                     <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between sticky-top">
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
}

export default withRouter(AuthComponent);