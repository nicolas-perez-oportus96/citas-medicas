import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../helpers/Token'

export default class NewCita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areasMedicas: [],
            areaMedicaSelect: {}
        }
    }

    async componentDidMount() {
        const token = await getToken();

        //consultando datos paciente
        const res = await axios.get('http://localhost:4000/api/paciente/me', {
            headers: {
                'x-access-token': token
            }
        })
        await this.setState(res.data)

        //consultando centro medico y areas de atencion
        const areasMedicas = await axios.get('http://localhost:4000/api/cm/me/areas', {
            headers: {
                'x-access-token': token
            }
        })

        await this.setState({
            areasMedicas: areasMedicas.data
        })
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelectChange = e => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            areaMedicaSelect: {
                id: e.target.options[selectedIndex].getAttribute('id'),
                nombre: e.target.value
            }
        })
    }

    onSubmitCita = async e => {
        e.preventDefault()
        console.log(this.state)
    }


    render() {
        return (
            <div className="signInComponent">
                <div className="row">
                    <div className="container">
                        <div className="card border-0 shadow p-3 mb-5 bg-white rounded my-5">
                            <div className="card-body p-5">
                                <h1 className="font-weight-light">Solicitud de Cita Medica</h1>
                                <form onSubmit={this.onSubmitCita}>
                                    <div className="form-group">
                                        <label htmlFor="area-atencion">Area de Atencion</label>
                                        <select className="form-control" id="area-atencion" name="area-atencion" onChange={this.onSelectChange}>
                                            {
                                                this.state.areasMedicas.map(am =>
                                                    (<option id={am._id} key={am._id} > {am.nombre} </option>)
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fecha">Fecha</label>
                                        <input type="date" className="form-control" name="fecha" id="fecha" onChange={this.onInputChange}></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="hora">Hora</label>
                                        <input type="time" className="form-control" name="hora" id="hora" onChange={this.onInputChange} />
                                    </div>

                                    <div className="d-flex justify-content-between  ">
                                        <Link className="btn btn-info mr-2" to="/escritorio"> <i className="fas fa-arrow-circle-left mr-1"></i>Volver atras</Link>
                                        <button type="submit" className="btn btn-success" href="/dashboard.html"><i className="fas fa-check-square mr-1"></i>Confirmar Cita</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
