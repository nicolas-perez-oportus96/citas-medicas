import React, { Component } from 'react'
import {getToken} from '../../helpers/Token'
import axios from 'axios'
const moment = require('moment');


export default class Dashboard extends Component {
    state = { citasPaciente: [] }

    async componentDidMount(){
        const token = await getToken();
        const res = await axios.get('http://localhost:4000/api/paciente/me/citas', {
            headers: {
                'x-access-token': token
            }
        })
        this.setState({
            citasPaciente: res.data
        })

        console.log(res.data)
    }
   

    render() {
        return (
            <div className="dashboard">
                {/* Container Citas */}

                <div class="container">
                    <div class="row">
                        {/* //rendering citas */}
                        {this.state.citasPaciente.map(cita =>(
                            <div class="col-md-4 p-2">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-calendar-check mr-1"></i>
                                                <h5>{cita.areaMedica.nombre}</h5>
                                            </div>
                                        </div>
                                    </div>
            
                                    <div class="card-body">
                                        <div class="container d-flex justify-content-between">
                                            <p class=" text-muted"><i class="fas fa-calendar-day mr-1"></i>{moment.parseZone(cita.start).utc().format("LL")} </p>
                                            <p class=" text-muted"><i class="far fa-clock mr-1"></i>{moment.parseZone(cita.start).utc().format("LT")}</p>
                                        </div>
                                    </div>
            
                                    <div class="card-footer align-items-center">
                                        <div class="d-flex justify-content-end">
                                            <button class="btn btn-info mr-1"><i class="fas fa-edit mr-1"></i>Cambiar</button>
                                            <button class="btn btn-danger"><i class="fas fa-trash-alt mr-1"></i>Borrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        )}
                        
                    </div>
                </div>
            </div>
        )
    }
}
