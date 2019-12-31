import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/favicon.png'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="30" height="30" class="d-inline-block align-top mr-1" alt=""></img>
                    Sistema de Horas Medicas
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

                    <form className="form-inline my-2 my-lg-0">
                        <div className="botones">
                            <Link className="btn btn-outline-primary my-2 my-sm-0" to="/login" type="submit">Iniciar Sesion</Link>
                            <Link className="btn btn-outline-success my-2 my-sm-0" to="/register" type="submit">Registarse</Link>
                        </div>
                    </form>
                </div>
            </nav>
        )
    }
}
