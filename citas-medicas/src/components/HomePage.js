import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import card1 from '../img/carrusel1.png'
import card2 from '../img/carrusel2.jpg'
import card3 from '../img/carrusel3.jpg'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                {/* Jumbotron */}
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Bienvenido a la nueva forma de atencion de salud!</h1>
                        <p className="lead">Presentamos una nueva solucion ante la necesidad de un sistema de atencion de salud mejorada.</p>
                        <hr className="my-4"></hr>
                        <div className="botones">
                            <Link className="btn btn-primary my-2 my-sm-0 mr-2" to="/login" type="submit">Iniciar Sesion</Link>
                            <Link className="btn btn-success my-2 my-sm-0" to="/register" type="submit">Registarse</Link>
                        </div>
                    </div>
                </div>

                {/* Tarjetas */}
                <div className="container mt-5">
                    <div className="row justify-content-between">
                        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                            <img src={card1} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Rapida gestion</h5>
                                <p className="card-text">Solicite sus citas medicas desde la aplicacion de forma rapida y sencilla.</p>
                            </div>
                        </div>

                        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                            <img src={card2} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Escritorio personal</h5>
                                <p className="card-text">Acceso a un escritorio personalizado con sus citas medicas e informacion
                        personal.</p>
                            </div>
                        </div>

                        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                            <img src={card3} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Diseño intuitivo</h5>
                                <p className="card-text">Esta aplicacion web fue diseñada aplicando estandares de diseño que permiten un
                        facil entendimiento de su interfaz.</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
