import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { getToken } from '../../helpers/Token'
import { showNotification } from '../../helpers/Notification'


export default class DatosCentro extends Component {
    state = {}

    async getCm(token){
        const res = await Axios.get('http://localhost:4000/api/cm/me', {
            headers: {
                'x-access-token': token
            }
        })
        await this.setState(res.data)
        console.log(this.state)
    }

    async componentDidMount(){
        const token = getToken();
        this.getCm(token);
        console.log(this.state)
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    onSubmitChanges = async e => {
        e.preventDefault()
        const token = getToken();

        console.log(this.state)
        const put = await Axios.put('http://localhost:4000/api/cm/me/' + this.state._id, 
        {
            nombre_cm: this.state.nombre_cm,
            correo: this.state.correo,
            telefono: this.state.telefono,
            direccion: this.state.direccion,
        }, {
            headers: {
                'x-access-token': token
            },
        });

        showNotification("Datos Modificados exitosamente", "Debes iniciar sesion nuevamente", 'success')

        localStorage.removeItem('session-token')
        this.props.history.push('/adminlogin')
        console.log(put)
    }

    render() {
        return (
            <div className="dashboard">
                <div className="container card border-0 shadow bg-white rounded">
                    <div className="container card-body ">
                        <form onSubmit={this.onSubmitChanges}>
                            <div className="titulo mb-1">
                                <h1 className="font-weight-light">Datos del Centro Medico</h1>
                                <hr />
                            </div>

                            <div className="card-body">

                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="nombre_cm">Nombre del Centro de Atencion Medica</label>
                                        <input type="text" className="form-control" id="nombre_cm" name="nombre_cm" onChange={this.onInputChange}  value={this.state.nombre_cm} required></input>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="correo" >Correo Electronico</label>
                                        <input type="text" className="form-control" id="correo" name="correo" onChange={this.onInputChange} value={this.state.correo} required></input>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="telefono">Telefono</label>
                                        <input type="number" className="form-control" id="telefono"name="telefono" onChange={this.onInputChange} value={this.state.telefono} required></input>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="direccion">Dirección</label>
                                        <input type="text" className="form-control" id="direccion" name="direccion" onChange={this.onInputChange} value={this.state.direccion} required></input>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-4">
                                        <Link className="btn btn-primary btn-lg btn-block" to='/centromedico'><i className="fas fa-chevron-left mr-3"></i>Volver a Mi Escritorio</Link>
                                    </div>

                                    <div className="col-md-8">
                                        <button className="btn btn-success btn-lg btn-block" type="submit"><i className="fas fa-save mr-3"></i>Guardar Cambios</button>
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
