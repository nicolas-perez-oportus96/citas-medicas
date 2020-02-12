import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../helpers/Token'
import Axios from 'axios'
import { showNotification } from '../../helpers/Notification'



export default class DatosPaciente extends Component {


    state = {
        fecha: ''
    }

    async componentDidMount() {
        const token = getToken();
        const res = await axios.get('http://localhost:4000/api/paciente/me', {
            headers: {
                'x-access-token': token
            }
        })
        this.setState(res.data)

        let fecha = new Date(this.state.fecha_nacimiento)
        let fechaString = fecha.toISOString().substr(0, 10)

        this.setState({
            fecha: fechaString
        })
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitChanges = async e => {
        e.preventDefault()
        const token = getToken();

        const put = await Axios.put('http://localhost:4000/api/paciente/me/' + this.state._id, {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            fecha_nacimiento: this.state.fecha_nacimiento,
            correo: this.state.correo,
            telefono: this.state.telefono
        }, {
            headers: {
                'x-access-token': token
            },
        });

        showNotification("Datos Modificados exitosamente", "Debes iniciar sesion nuevamente", 'success')

        localStorage.removeItem('session-token')
        this.props.history.push('/login')
        console.log(put)
    }

    render() {
        return (
           <div className="dashboard">
                <div className="container card border-0 shadow bg-white rounded">
                    <div className="container card-body ">
                        <form onSubmit={this.onSubmitChanges}>
                            <div className="titulo mb-1">
                                <h1 className="font-weight-light">Datos del Paciente</h1>
                                <hr />
                            </div>

                            <div className="card-body">

                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nombres">Nombres</label>
                                        <input type="text" className="form-control" id="nombres" name="nombres" value={this.state.nombres} onChange={this.onInputChange} required></input>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="apellidos">Apellidos</label>
                                        <input type="text" className="form-control" id="apellidos" name="apellidos" placeholder="Pérez Cotapos" value={this.state.apellidos} onChange={this.onInputChange} required></input>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                                        <input type="date" className="form-control" id="fecha_nacimiento" name="fecha_nacimiento" placeholder={this.state.fecha} onChange={this.onInputChange} required></input>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="correo">Correo Electronico</label>
                                        <input type="text" className="form-control" id="correo" name="correo" placeholder="example@example.cl" value={this.state.correo} onChange={this.onInputChange} required></input>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="telefono">Telefono</label>
                                        <input type="number" className="form-control" id="telefono" name="telefono" placeholder="912345678" value={this.state.telefono} onChange={this.onInputChange} required></input>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <Link className="btn btn-primary btn-block" to='/escritorio'><i className="fas fa-chevron-left mr-3"></i>Volver a Mi Escritorio</Link>
                                    </div>

                                    <div className="col-md-9">
                                        <button className="btn btn-success btn-block" type="submit"><i className="fas fa-save mr-3"></i>Guardar Cambios</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
