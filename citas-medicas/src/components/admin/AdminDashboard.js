import React, { Component } from 'react'
import { getToken } from '../../helpers/Token'
import { showNotification } from '../../helpers/Notification'
import Axios from 'axios'
import Modal from 'react-modal';


const modalStyles = {
    overlay:{
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: 'rgb(255, 255, 255)'
    }
};
Modal.setAppElement(document.getElementById('root'));

export default class AdminDashboard extends Component {
    constructor(props){
        super(props);
        this.state = { 
            areasMedicas:[],
            showModal: false,
            newAreaMedica: ''
        }

        this.getAreasMedicas = this.getAreasMedicas.bind(this)
        this.deleteArea = this.deleteArea.bind(this)
        this.showModal = this.showModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.createAreaMedica = this.createAreaMedica.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
    }
    

    async getAreasMedicas(){
        const token = getToken();
        const res = await Axios.get('http://localhost:4000/api/cm/me/areas', {
            headers: {
                'x-access-token': token
            }})

        this.setState({
            areasMedicas: res.data
        })
        console.log(this.state)
    }

    async componentDidMount() {   
        this.getAreasMedicas()
    }

    async deleteArea(id_area) {
        const token = getToken();
        const res = await Axios.delete('http://localhost:4000/api/cm/me/areas/' + id_area, {
            headers: {
                'x-access-token': token
            }
        })
        showNotification(res.data.message,' ', 'success')
        this.getAreasMedicas()
    }

    showModal(){
        this.setState({showModal: true})
    }

    closeModal(){
        this.setState({showModal: false})
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createAreaMedica = async e => {
        e.preventDefault()
        console.log('asd')
        const token = getToken();
        const res = await Axios.post('http://localhost:4000/api/cm/me/areas', {
            areaMedica: {
                nombre: this.state.newAreaMedica
            }
        }, {
            headers: {
                'x-access-token': token
            },
        });
        console.log(res.data)
        this.closeModal()
        this.getAreasMedicas()
        await showNotification(res.data.message,' ','success')
    }

    render() {
        return (
            <div className="dashboard">
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                    contentLabel="Example Modal">
                        <h4>Creacion de area medica</h4>
                        <hr className="mb-2"/>

                        <form onSubmit={this.createAreaMedica}>
                            <p>Ingresa el nombre de la nueva area medica:</p>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                                </div>
                                <input name="newAreaMedica" type="text" class="form-control" onChange={this.onInputChange} placeholder="Dentista"></input>
                            </div>
                            <button className="btn btn-success btn-block" type='submit' ><i className="fas fa-save mr-3"></i>Crear Area Medica</button>
                        </form>
                </Modal>
                <div class="container">
                    <div class="areas-container">
                        <div className="mb-3">
                            <h1 className="font-weight-light">Gestion de Areas Medicas</h1>
                            <hr />
                        </div>
                        <div className="row d-flex justify-content-between">
                            {
                                this.state.areasMedicas.map(areaMedica => (
                                    <div key={areaMedica._id} class="card area-medica mb-4">
                                        <div class="card-body d-flex flex-column justify-content-between">
                                            <div className="text">
                                                <h5 class="card-title mb-2">{areaMedica.nombre}</h5>
                                                <hr/>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <button type="button" class="btn btn-outline-success" > <i class="fas fa-calendar-week mr-1"></i>Citas</button>
                                                <button type="button" class="btn btn-outline-danger" onClick={() => this.deleteArea(areaMedica._id)}> <i class="fas fa-trash-alt mr-1"></i>Borrar</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            <button class="btn card area-medica shadow-sm p-3 text-white bg-info rounded" onClick={this.showModal}>
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
