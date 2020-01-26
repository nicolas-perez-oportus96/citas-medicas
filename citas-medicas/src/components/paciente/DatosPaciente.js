import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../helpers/Token'
import Axios from 'axios'
import { showNotification } from '../../helpers/Notification'



export default class DatosPaciente extends Component {
    
    
    state = {
        fecha:''
    }
    
    async componentDidMount(){
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

        console.log(this.state._id)
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
            fecha_nacimiento:this.state.fecha_nacimiento,
            correo: this.state.correo,
            telefono: this.state.telefono
        },{
            headers: {
                'x-access-token': token
            }, 
        });

        showNotification("Datos Modificados exitosamente","Debes iniciar sesion nuevamente", 'success')

        localStorage.removeItem('session-token')
        this.props.history.push('/login')
        console.log(put)
    }

    render() {
        return (
            <div  className="dashboard">
                <form onSubmit={this.onSubmitChanges} className="container pt-3">
                    <div className="card mb-3">
                        <h5 className="card-header">Informacion personal</h5>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label for="nombres">Nombres</label>
                                    <input type="text" className="form-control" id="nombres" name="nombres" value={this.state.nombres} onChange={this.onInputChange} required></input>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="apellidos">Apellidos</label>
                                    <input type="text" className="form-control" id="apellidos" name="apellidos"placeholder="Pérez Cotapos" value={this.state.apellidos} onChange={this.onInputChange} required></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 mb-3">
                                    <label for="fecha_nacimiento">Fecha de nacimiento</label>
                                    <input type="date" className="form-control" id="fecha_nacimiento" name="fecha_nacimiento" placeholder={this.state.fecha} onChange={this.onInputChange} required></input>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card mb-3">
                        <h5 className="card-header">Informacion de Contacto</h5>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label for="correo">Correo Electronico</label>
                                    <input type="text" className="form-control" id="correo" name="correo" placeholder="example@example.cl" value={this.state.correo} onChange={this.onInputChange} required></input>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="telefono">Telefono</label>
                                    <input type="number" className="form-control" id="telefono" name="telefono" placeholder="912345678" value={this.state.telefono} onChange={this.onInputChange} required></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                        <Link className="btn btn-primary btn-lg btn-block" to='/escritorio'><i className="fas fa-chevron-left mr-3"></i>Volver a Mi Escritorio</Link>
                        </div>

                        <div className="col-md-9">
                        <button className="btn btn-success btn-lg btn-block" type="submit"><i className="fas fa-save mr-3"></i>Guardar Cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
