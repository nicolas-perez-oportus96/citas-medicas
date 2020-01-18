import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Login extends Component {
    render() {
        return (
            <div className="signInComponent">
                <div className="signInCard container">
                    <div className="card border-1 shadow bg-white rounded mt-2">
                        <div className="card-body p-5">
                            <h1 className="font-weight-light">Iniciar Sesion</h1>
                            <hr />

                            <div className="userToggle d-flex flex-column my-4">
                                <label htmlFor="rutP">Seleccione tipo de usuario.</label>
                                <div className="btn-group btn-group-toggle">
                                    <label className="btn btn-secondary active"><input type="radio" name="options" id="option1" /><i class="fas fa-user mr-1"></i>Paciente</label>
                                    <label className="btn btn-secondary"><input type="radio" name="options" value="option2" /> <i class="fas fa-clinic-medical mr-1"></i>Administrador</label>
                                </div>
                            </div>



                            <form>
                                <div className="input-group my-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text signInlabel" id="basic-addon1"> RUT Usuario: </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Ejemplo: 11111111-2" aria-label="Username" aria-describedby="basic-addon1"></input>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text signInlabel" id="basic-addon1">Contraseña:</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Ingrese su contraseña" aria-label="Username" aria-describedby="basic-addon1"></input>
                                </div>

                                <Link type="submit" className="btn btn-primary btn-lg btn-block mt-4" to="">Iniciar Sesion</Link>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
