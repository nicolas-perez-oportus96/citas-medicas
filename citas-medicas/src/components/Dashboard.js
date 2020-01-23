import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import { getToken } from '../helpers/Token'
import Axios from 'axios'

export default class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = { }
        
        this.render = this.render.bind(this);
        this.logOut= this.logOut.bind(this);
    }
   
    

    async componentDidMount(){

        //Almacenando token
        const token = await getToken();

        //Consultando usuario desde token
        const res = await Axios.get('http://localhost:4000/api/paciente/me', {
            headers: {
                'x-access-token': token
            }
        })



        //Cargando state con datos del paciente
        await this.setState({
            id: res.data._id,
            rut: res.data.rut,
            nombres: res.data.nombres,
            apellidos: res.data.apellidos,
            fecha_nacimiento: res.data.fecha_nacimiento,
            ubicacion: res.data.ubicacion,
            centroMedico: res.data.centroMedico.nombre,
            telefono: res.data.telefono,
            correo: res.data.correo
        })

        console.log(res.data)
        console.log(this.state)

    }

    async logOut() {
        localStorage.removeItem('session-token');
        this.props.history.push('/');
    }


    render() {

        return (
            <div className="dashboard">

                {/* NavBar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
                    <h5><i className="far fa-user mr-1"></i>Bienvenido { this.state.nombres } <button onClick={this.logOut} className="badge badge-pill badge-danger">Cerrar Sesion</button></h5>

                    <div className="centroMedico">
                        <h5><i className="far fa-hospital mr-1"></i> { this.state.centroMedico }  </h5>
                    </div>
                    <div className="botones">
                        <button type="button" className="btn btn-outline-success" href="/createDate.html"> <i className="fas fa-calendar-week mr-1"></i>Solicitar Cita Medica</button>
                        <button className="btn btn-outline-info my-2 ml-2 my-sm-0" to='/escritorio/datos' type="submit"> <i className="fas fa-info-circle mr-1"></i>Informacion Personal</button>
                    </div>
                </nav>


                {/* Container Citas */}

                <div class="container">
                    <div class="row">

                        {/* Cita */}
                        <div class="col-md-4 p-2">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-calendar-check mr-1"></i>
                                            <h5>Dentista</h5>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div class="container d-flex justify-content-between">
                                        <p class=" text-muted"><i class="fas fa-calendar-day mr-1"></i>11/11/2019</p>
                                        <p class=" text-muted"><i class="far fa-clock mr-1"></i>11:30</p>
                                    </div>
                                </div>

                                <div class="card-footer align-items-center">
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-info mr-1"><i class="fas fa-edit mr-1"></i>Cambiar</button>
                                        <button class="btn btn-danger"><i class="fas fa-trash-alt mr-1"></i>Borrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Cita */}
                        <div class="col-md-4 p-2">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-calendar-check mr-1"></i>
                                            <h5>Dentista</h5>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div class="container d-flex justify-content-between">
                                        <p class=" text-muted"><i class="fas fa-calendar-day mr-1"></i>11/11/2019</p>
                                        <p class=" text-muted"><i class="far fa-clock mr-1"></i>11:30</p>
                                    </div>
                                </div>
                                
                                <div class="card-footer align-items-center">
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-info mr-1"><i class="fas fa-edit mr-1"></i>Cambiar</button>
                                        <button class="btn btn-danger"><i class="fas fa-trash-alt mr-1"></i>Borrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                       


                        {/* Cita */}
                        <div class="col-md-4 p-2">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-calendar-check mr-1"></i>
                                            <h5>Dentista</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="container d-flex justify-content-between">
                                        <p class=" text-muted"><i class="fas fa-calendar-day mr-1"></i>11/11/2019</p>
                                        <p class=" text-muted"><i class="far fa-clock mr-1"></i>11:30</p>
                                    </div>
                                </div>
                                
                                <div class="card-footer align-items-center">
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-info mr-1"><i class="fas fa-edit mr-1"></i>Cambiar</button>
                                        <button class="btn btn-danger"><i class="fas fa-trash-alt mr-1"></i>Borrar</button>
                                    </div>
                                </div>
                            </div>
                        </div> 




                    </div>
                </div>








            </div>
        )
    }
}
