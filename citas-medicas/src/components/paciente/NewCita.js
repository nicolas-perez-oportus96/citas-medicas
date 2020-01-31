import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { getToken } from '../../helpers/Token'

require('react-big-calendar/lib/css/react-big-calendar.css')
require('moment/locale/es.js');
const localizer = momentLocalizer(moment);
const myEventsList= [{
    title: "today",
    start: new Date('2020-05-05 10:22:00'),
    end: new Date('2020-05-05 10:42:00')
  },
  {
    title: "string",
    start: new Date('2020-05-05 12:22:00'),
    end: new Date('2020-05-05 13:42:00')
  }]



export default class NewCita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areasMedicas: [],
            areaMedica:{},
            cita: {
                start: Date,
                end: Date,
            }
        }

        this.onSelectChange = this.onSelectChange.bind(this)
        this.onSelectCita = this.onSelectCita.bind(this)
        this.onSubmitCita = this.onSubmitCita.bind(this)
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

    onSelectChange = e => {
        const selectedIndex = e.target.options.selectedIndex;
        const areaMedica = {
            id: e.target.options[selectedIndex].getAttribute('id'),
            nombre: e.target.value
        }
        this.setState({
            areaMedica: areaMedica
        })
    }

    selecting = e => {
        return false;
    }

    onSelectCita =  e => {
        this.setState({
            cita: {
                start: e.start,
                end: e.end
            }
        }) 
    }

    onSubmitCita = async e => {
        e.preventDefault()
        console.log(this.state)
        const token = getToken();

        const res = await axios.post('http://localhost:4000/api/paciente/me/citas', {
            cita:{
                paciente: {
                    id: this.state._id,
                    rut: this.state.rut,
                    nombres: this.state.nombres,
                    apellidos: this.state.apellidos
                },
                areaMedica: this.state.areaMedica,
                title: 'Cita',
                start: this.state.cita.start,
                end: this.state.cita.end
            }
        }, {
            headers: {
                'x-access-token': token
            },
        });

        console.log(res)
        
    }

    render() {
        return (
            <div className="dashboard">
                <div className="container card border-0 shadow bg-white rounded">
                    <div className="container card-body ">
                        <form onSubmit={this.onSubmitCita}>
                            <div className="titulo mb-4">
                                <h1 className="font-weight-light">Solicitud de Cita Medica</h1>
                                <hr/>
                            </div>

                            <div className="form-group pb-3">
                                <label for="exampleInputEmail1" className="cita-label"><i class="far fa-hospital mr-2"></i>Seleccione Area de Atencion</label>
                                <select className="form-control" id="exampleFormControlSelect1" onChange={this.onSelectChange}>
                                    <option value="" >Areas de Atencion Medica</option>
                                {
                                    this.state.areasMedicas.map(am =>
                                        (<option id={am._id} key={am._id} > {am.nombre} </option>)
                                    )
                                }
                                </select>
                            </div>

                            <div className="calendario">
                                
                                <div className="d-flex flex-column mb-2">
                                    <label className="cita-label mb-0" for=" date "><i class="far fa-calendar-check mr-2"></i>Seleccione Fecha y Hora</label>
                                    <small>Haz clic en el dia y hora disponible en la cual desees reservar una cita. </small>
                                </div>

                                <div className="bigCalendar-container mb-3">
                                    <Calendar
                                        localizer={localizer}
                                        events={myEventsList}
                                        startAccessor="start"
                                        endAccessor="end"
                                        views={['work_week']}
                                        defaultView='work_week'
                                        messages={{
                                        next: "Siguiente",
                                        previous: "Anterior",
                                        today: "Hoy",
                                        month: "Mes",
                                        week: "Semana",
                                        day: "Día"
                                        }}
                                        step="60"
                                        timeslots="1"
                                        selectable={true}
                                        onSelectSlot={this.onSelectCita}
                                        onSelecting={this.selecting}
                                        min={new Date(0, 0, 0, 8, 0, 0)}
                                        max={new Date(0, 0, 0, 20, 0, 0)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3">
                                    <Link className="btn btn-primary btn btn-block" to='/escritorio'><i className="fas fa-chevron-left mr-3"></i>Volver a Mi Escritorio</Link>
                                </div>

                                <div className="col-lg-9">
                                    <button className="btn btn-success btn-block" type="submit"><i className="fas fa-save mr-3"></i>Solicitar Cita Medica</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

