import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {showNotification} from '../../helpers/Notification'
import NavBar from '../Navbar'

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: '',
            password: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    onInputChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    }

    signIn = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/paciente/login', {
            rut: this.state.user,
            password: this.state.password,
        })
        if(res.data.auth === true) {
            localStorage.setItem('session-token', res.data.token)
            this.props.history.push('/escritorio');
        } else {
            showNotification('Problema al iniciar sesion',res.data.message,'info')
        };
    }

    render() {
        return (
            <div >
                <NavBar/>
                <div className="dashboard">
                    <div className="signInCard container">
                        <div className="card border-1 shadow bg-white rounded mt-2">
                            <div className="card-body p-5">
                                <h1 className="font-weight-light">Ingreso para Pacientes</h1>
                                <hr className="mx-0"/>
                                <form onSubmit={this.signIn}>
                                    <div className="input-group my-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text signInlabel" id="basic-addon1"> RUT Paciente: </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Ejemplo: 11111111-2" name="user" onChange={this.onInputChange} value={this.state.user}></input>
                                    </div>
        
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text signInlabel" id="basic-addon1">Contrase&ntilde;a:</span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Ingrese su contrase&ntilde;a" name="password" onChange={this.onInputChange} value={this.state.password}></input>
                                    </div>
        
                                    <button type="submit" className="btn btn-primary btn-lg btn-block mt-4 mb-2">Iniciar Sesi&oacute;n</button>
        
                                    <small className="text-secondary">Si deseas iniciar sesi&oacute;n como administrador de centro m&eacute;dico, <Link to='/adminlogin'>haz clic aqu&iacute;.</Link></small>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}








