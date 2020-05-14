import React, { Component } from 'react'
import { getToken } from '../../helpers/Token'
import axios from 'axios'
import moment from 'moment'
require('moment/locale/es.js');


export default class CitasArea extends Component {
    state = {
        areaMedica:{},
        citasArea:[]
    }
    componentDidMount(){
        this.getCitasArea()
        this.getAreaMedica()
    }


    async getAreaMedica(){
        //Consultando access token en LocalStorage
        const token = getToken()

        //Poblando state con citas de area medica 
        const res = await axios.get('http://localhost:4000/api/cm/me/areas/' + this.props.match.params.id, {
            headers: {
                'x-access-token': token
            }
        })
        
        this.setState({
            areaMedica:res.data
        })

        console.log(this.state)
    }

    async getCitasArea(){
        //Consultando access token en LocalStorage
        const token = getToken()

        //Poblando state con citas de area medica 
        const res = await axios.get('http://localhost:4000/api/cm/me/areas/' + this.props.match.params.id + '/citas', {
            headers: {
                'x-access-token': token
            }
        })
        console.log(res.data)
        this.setState({
            citasArea:res.data
        })
        console.log(this.state)

    }

  
    render() {
        return (
            <div className="dashboard admin-signed pt-5">
                <div className="container card border-0 shadow bg-white rounded">
                    <div className="container card-body ">
                        <form onSubmit={this.onSubmitChanges}>
                            <div className="titulo mb-1">
                                <div className="head d-flex justify-content-between align-items-center">
                                    <h1 className="font-weight-light">Registro de Citas M&eacute;dicas</h1>
                                    <div className="area">
                                        <h3 className="font-weight-light">&Aacute;rea: {this.state.areaMedica.nombre}</h3>
                                    </div>
                                </div>
                                <hr />
                            </div>

                            <table class="table table-striped my-3">
                                <thead>
                                    <tr>
                                        <th scope="col" className="pr-0">Fecha</th>
                                        <th scope="col">Hora</th>
                                        <th scope="col">RUT</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Nombres</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    this.state.citasArea.map(cita => (
                                        <tr>
                                            <td className="pr-0">{moment(cita.start).format("LL")}</td>
                                            <td>{moment.utc(cita.start).format("LT")}</td>
                                            <td>{cita.paciente.rut}</td>
                                            <td>{cita.paciente.apellidos}</td>
                                            <td>{cita.paciente.nombres}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
