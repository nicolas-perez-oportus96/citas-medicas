import React, { Component } from 'react'
import { getToken } from '../../helpers/Token'
import axios from 'axios'
const moment = require('moment');



export default class Dashboard extends Component {
    state = {
        citasPaciente: []
    }

    async componentDidMount() {
        this.getCitas()
    }

    async getCitas() {
        const token = getToken();
        const res = await axios.get('http://localhost:4000/api/paciente/me/citas', {
            headers: {
                'x-access-token': token
            }
        })
        this.setState({
            citasPaciente: res.data
        })
    }

    async deleteCita(id_cita) {
        const token = getToken();
        const res = await axios.delete('http://localhost:4000/api/paciente/me/citas/' + id_cita, {
            headers: {
                'x-access-token': token
            }
        })

        this.getCitas()
        console.log(res.data)
    }


    render() {
        return (
            <div className="dashboard">
                {/* Container Citas */}

                <div className="container">

                    {this.state.citasPaciente.length < 1 &&
                        <div className="d-flex justify-content-around mt-5  ">
                            <h1 className="text-white-50">No registras citas</h1>
                        </div>
                    }
                    <div className="row">

                        {/* //rendering citas */}
                        {this.state.citasPaciente.map(cita => (
                            <div key={cita._id} className="col-md-4 p-2">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-calendar-check mr-1"></i>
                                                <h5>{cita.areaMedica.nombre}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="container d-flex justify-content-between">
                                            <p className=" text-muted"><i className="fas fa-calendar-day mr-1"></i>{moment(cita.start).format("LL")} </p>
                                            <p className=" text-muted"><i className="far fa-clock mr-1"></i>{moment(cita.start).format("LT")}</p>
                                        </div>
                                    </div>

                                    <div className="card-footer align-items-center">
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-danger" onClick={() => this.deleteCita(cita._id)}><i className="fas fa-trash-alt mr-1"></i>Borrar</button>
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
