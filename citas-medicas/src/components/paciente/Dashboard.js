import React, { Component } from 'react'


export default class Dashboard extends Component {
    
   

    render() {

        return (
            <div className="dashboard">

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
