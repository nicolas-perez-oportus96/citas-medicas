import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NewCita extends Component {

    componentDidMount(){
        
    }

    render() {
        return (
            <div class="signInComponent">
                <div class="row">
                    <div class="container">
                        <div class="card border-0 shadow p-3 mb-5 bg-white rounded my-5">
                            <div class="card-body p-5">
                                <h1 class="font-weight-light">Solicitud de Cita Medica</h1>
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Area de Atencion</label>
                                        <select class="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="date">Fecha</label>
                                        <input type="date" class="form-control" name="" date="" id="date"></input>
                                    </div>

                                    <div class="form-group">
                                        <label for=" date ">Hora</label>
                                        <input type="time" class="form-control" name="date" id="date" />
                                    </div>

                                    <div className="d-flex justify-content-between  ">
                                        <Link class="btn btn-info mr-2" to="/escritorio"> <i class="fas fa-arrow-circle-left mr-1"></i>Volver atras</Link>
                                        <button type="submit" class="btn btn-success" href="/dashboard.html"><i class="fas fa-check-square mr-1"></i>Confirmar Cita</button>
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
