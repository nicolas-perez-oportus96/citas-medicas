import React, { Component } from 'react'
import { getToken } from '../../helpers/Token'
import Axios from 'axios'


export default class AdminDashboard extends Component {
    state = { 
        areasMedicas:[]
    }

    async getAreasMedicas(token){
        const user = await Axios.get('http://localhost:4000/api/cm/me/areas', {
            headers: {
                'x-access-token': token
            }})

        this.setState({
            areasMedicas: user.data
        })
        console.log(this.state)
    }

    async componentDidMount() {   
        const token = getToken();
        this.getAreasMedicas(token)
    }

    render() {
        return (
            <div className="dashboard">
                <div class="container mt-4">
                    <div class="row">

                        {
                            this.state.areasMedicas.map(areaMedica => (
                                <div key={areaMedica._id}class="col-md-4 p-2 ">
                                    <div class="card area-medica">
                                        <div class="card-body">
                                            <h5 class="card-title">{areaMedica.nombre}</h5>
                                            <div class="d-flex justify-content-between">
                                                <button type="button" class="btn btn-outline-success" href="/createDate.html"> <i class="fas fa-calendar-week mr-1"></i>Citas</button>
                                                <button type="button" class="btn btn-outline-secondary" href="/createDate.html"> <i class="fas fa-calendar-week mr-1"></i>Editar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        

                        <div class="col-md-4 p-2 ">
                            <button class="btn card area-medica shadow-sm p-3 text-white bg-info rounded">
                                <div class="card-body">
                                    <h5 class="card-title">Crear Nueva Area Medica</h5>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
