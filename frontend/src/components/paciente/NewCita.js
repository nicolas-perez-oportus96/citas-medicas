import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { getToken } from '../../helpers/Token'
import Modal from 'react-modal';
import { showNotification } from '../../helpers/Notification'
require('react-big-calendar/lib/css/react-big-calendar.css')
require('moment/locale/es.js');

const localizer = momentLocalizer(moment);
const modalStyles = {
    overlay:{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',

    },
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: 'rgb(255, 255, 255)'
    }
};

Modal.setAppElement(document.getElementById('root'));


export default class NewCita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areasMedicas: [],
            areaMedica: {},
            citasArea: [],
            cita: {
                start: Date,
                end: Date,
            },
            isActive: false,
            showModal: false
        }

        this.onSelectChange = this.onSelectChange.bind(this)
        this.onSelectCita = this.onSelectCita.bind(this)
        this.onSubmitCita = this.onSubmitCita.bind(this)
        this.showModal = this.showModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
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

    onSelectChange = async e => {
        const token = getToken();
        const selectedIndex = e.target.options.selectedIndex;
        const areaMedica = {
            id: e.target.options[selectedIndex].getAttribute('id'),
            nombre: e.target.value
        }

        //consultando citas de area medica 
        const res = await axios.get('http://localhost:4000/api/cm/me/areas/' + e.target.options[selectedIndex].getAttribute('id') + '/citas', {
            headers: {
                'x-access-token': token
            }
        })
        const citas = res.data

        for (let i = 0; i < citas.length; i++) {
            citas[i].start = moment(citas[i].start).toDate();
            citas[i].end = moment(citas[i].end).toDate();
        }

        this.setState({
            areaMedica: areaMedica,
            citasArea: citas,
            isActive: true
        })
    }

    showModal() {
        this.setState({showModal: true})
    }

    closeModal() {
        this.setState({showModal: false})
    }

    onSelectCita = e => {
        const localTime = new Date();
        console.log(e.start)

        if(e.start <= localTime){
            showNotification("Fecha pasada","Selecciona una fecha correcta", "info")
        } else {
            this.setState({
                cita: {
                    start: e.start,
                    end: e.end,
                }
            })
            this.showModal();
        }
    }

    selectEvent() {
        showNotification("Error de seleccion", "Ya existe una cita programada en la fecha seleccionada.", 'info')
    }

    onSubmitCita = async e => {
        e.preventDefault()
        const token = await getToken();

        await axios.post('http://localhost:4000/api/paciente/me/citas', {
            cita: {
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

        await this.props.history.push('/escritorio')
        await showNotification('Cita Medica Solicitada!',' ','success')
    }
    
    render() {
        return (
            <div id="dashboard"className="dashboard pt-5 signed" >
                <div className="container card border-0 shadow bg-white rounded">
                    <div className="container card-body ">
                        <div className="titulo mb-4">
                            <h1 className="font-weight-light">Solicitud de Cita M&eacute;dica</h1>
                            <hr />
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="exampleInputEmail1" className="cita-label"><i className="far fa-hospital mr-2"></i>Seleccione &Aacute;rea de Atenci&oacute;n</label>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={this.onSelectChange}>
                                <option value="" >&Aacute;reas de Atenci&oacute;n M&eacute;dica</option>
                                {
                                    this.state.areasMedicas.map(am =>
                                        (<option id={am._id} key={am._id} > {am.nombre} </option>)
                                    )
                                }
                            </select>
                        </div>

                        {
                            this.state.isActive && <div className="calendario">

                                <div className="d-flex flex-column mb-2">
                                    <label className="cita-label mb-0" htmlFor=" date "><i className="far fa-calendar-check mr-2"></i>Seleccione Fecha y Hora</label>
                                    <small>Haz clic en el d&iacute;a y hora disponible en la cual desees reservar una cita. </small>
                                </div>

                                <div className="bigCalendar-container mb-3">
                                    <Calendar
                                        localizer={localizer}
                                        events={this.state.citasArea}
                                        startAccessor="start"
                                        endAccessor="end"
                                        views={['work_week']}
                                        defaultView='work_week'
                                        messages={{
                                            next: "Siguiente",
                                            previous: "Anterior",
                                            today: "Hoy"
                                        }}
                                        step={60}
                                        timeslots={1}
                                        selectable={true}
                                        onSelectSlot={this.onSelectCita}
                                        onSelectEvent={this.selectEvent}
                                        onSelecting={() => {return false}}
                                        min={new Date(0, 0, 0, 8, 0, 0)}
                                        max={new Date(0, 0, 0, 20, 0, 0)}
                                    />
                                </div>
                            </div>
                        }

                        <div className="row">
                            <div className="col-lg-3">
                                <Link className="btn btn-primary btn btn-block" to='/escritorio'><i className="fas fa-chevron-left mr-3"></i>Volver a Mi Escritorio</Link>
                            </div>

                            
                        </div>

                        <Modal
                            isOpen={this.state.showModal}
                            onRequestClose={this.closeModal}
                            style={modalStyles}
                            contentLabel="Example Modal">

                            <div className="">
                                <h4>Confirmaci&oacute;n de Cita M&eacute;dica</h4>
                                <hr className="mb-2"/>
                            </div>

                            <div>
                                <p className=" text-muted"><i className="far fa-hospital mr-1"></i><b>&Aacute;rea de atenci&oacute;n:</b> {this.state.areaMedica.nombre}</p>
                                <p className=" text-muted"><i className="fas fa-calendar-day mr-1"></i><b>Fecha:</b> {moment(this.state.cita.start).format("LL")} </p>
                                <p className=" text-muted"><i className="far fa-clock mr-1"></i><b>Hora:</b> {moment(this.state.cita.start).format("LT")}</p>
                            </div>

                            <button className="btn btn-success btn-block" onClick={this.onSubmitCita}><i className="fas fa-save mr-3"></i>Solicitar Cita M&eacute;dica</button>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

