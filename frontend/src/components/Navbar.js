import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
                <Link className="navbar-brand d-flex justify-content-between align-items-center " to="/">
                    <img src='/img/favicon.png' width="30" height="30" className="d-inline-block align-top mr-1" alt=""></img>
                    <h1 className="logo">Sistema de Citas M&eacute;dicas</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

                    <form className="form-inline my-2 my-lg-0">
                        <div className="botones">
                            <Link className="btn btn-outline-primary my-2 my-sm-0 mr-2" to="/login" type="submit">Iniciar Sesi&oacute;n</Link>
                            <Link className="btn btn-outline-success my-2 my-sm-0" to="/register" type="submit">Registarse</Link>
                        </div>
                    </form>
                </div>
            </nav>
        )
    }
}
