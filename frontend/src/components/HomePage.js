import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/Navbar'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                {/* Jumbotron */}
                <div className="hero mb-5">
                    <div className="jumbo-content">
                        <div>
                            <h1 className="display-4 my-4">Te presentamos, <br/>la nueva forma de atenci&oacute;n de salud...</h1>
                            <p className="lead"> Gestiona tus citas m&eacute;dicas desde la comodidad de tu casa.</p>
                        </div>
                        <div>
                            <hr className="mb-3 mx-0"></hr>
                            <div className="d-flex justify-content-end">
                                <Link className="btn btn-primary mr-4" to="/login" type="submit">Iniciar Sesi&oacute;n</Link>
                                <Link className="btn btn-success " to="/register" type="submit">Registarse</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section my-5">
                    <div className="container  px-0 ">
                        <h2 className="logo section-title">Reg&iacute;strate para acceder a un mont&oacute;n de beneficios!</h2>
                        <hr></hr>
                    </div>
                </div>

                

                {/* Tarjetas */}
                <div className="container mt-5">
                    <div className="row justify-content-between">
                        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '20rem' }}>
                            <img src='/img/carrusel1.png' className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">R&aacute;pida gesti&oacute;n</h5>
                                <p className="card-text">Solicite sus citas m&eacute;dicas desde la aplicacion de forma r&aacute;pida y sencilla.</p>
                            </div>
                        </div>

                        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '20rem' }}>
                            <img src='/img/carrusel2.jpg' className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Escritorio personal</h5>
                                <p className="card-text">Accede a tu escritorio personal para ver tus citas m&eacute;dicas e informaci&oacute;n
                        personal.</p>
                            </div>
                        </div>

                        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '20rem' }}>
                            <img src='/img/carrusel3.jpg' className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Diseño intuitivo</h5>
                                <p className="card-text">Interfaz f&aacute;cil de entender y usar.</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
