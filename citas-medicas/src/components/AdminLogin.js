import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class Login extends Component {
    state = {
        user: '',
        password: ''
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    adminSignIn = async e => {
        e.preventDefault()
        const res = await axios.post('http://localhost:4000/api/cm/login', {
            rut_admin: this.state.user,
            password: this.state.password,
        })
        console.log(res)
    }


    render() {
        return (
            <div className="signInComponent">
                <div className="signInCard container">
                    <div className="card border-1 shadow bg-white rounded mt-2">
                        <div className="card-body p-5">
                            <h1 className="font-weight-light">Iniciar Sesion para Centros Medicos</h1>
                            <hr />
                            <form onSubmit={this.adminSignIn}>
                                <div className="input-group my-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text signInlabel" id="basic-addon1"> RUT Administrador: </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Ejemplo: 11111111-2" name="user" onChange={this.onInputChange}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text signInlabel" id="basic-addon1">Contraseña:</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Ingrese su contraseña" name="password" onChange={this.onInputChange}></input>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg btn-block mt-4 mb-2" to="">Iniciar Sesion</button>

                                <small className="text-secondary">Si deseas iniciar sesion como paciente,<Link to='/login'> haz click aqui.</Link> </small>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
