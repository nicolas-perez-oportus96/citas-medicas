import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';

import NavBar from '../components/Navbar'
import { store } from 'react-notifications-component';


export default class Register extends Component {

    state = {
        regiones: [],
        ciudades: [],
        centrosMedicos: [],
        rut: '',
        rut_admin: '',
        password: '',
        nombres: '',
        apellidos: '',
        idRegion: '',
        region: '',
        idCiudad: '',
        ciudad: '',
        direccion: '',
        idCentroMedico: '',
        centroMedico: '',
        telefono: '',
        email: '',
        nombre_cm: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/region/')
        this.setState({
            regiones: res.data,
            idRegion: res.data[0]._id,
            region: res.data[0].nombre
        })
    }

    async cargarCiudades(id) {
        const res = await axios.get('http://localhost:4000/api/region/' + id + "/cities")
        this.setState({ ciudades: res.data })
    }

    async cargarCMs(idCiudad) {
        const res = await axios.get("http://localhost:4000/api/cm/bycity/" + idCiudad)
        this.setState({ centrosMedicos: res.data })
    }

    notification(titulo, mensaje, tipo) {
        store.addNotification({
            title: titulo,
            message: mensaje,
            type: tipo,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    onSubmitPaciente = async e => {
        e.preventDefault()
        const res = await axios.post('http://localhost:4000/api/paciente/register', {
            rut: this.state.rut,
            password: this.state.password,
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            fecha_nacimiento: this.state.fecha_nacimiento,
            ubicacion: {
                region: {
                    _id: this.state.idRegion,
                    nombre: this.state.region
                },
                ciudad: {
                    _id: this.state.idCiudad,
                    nombre: this.state.ciudad
                }
            },
            centroMedico: {
                id: this.state.idCentroMedico,
                nombre: this.state.centroMedico
            },
            telefono: this.state.telefono,
            correo: this.state.email
        })

        if (res.data.auth) {
            store.addNotification({
                title: res.data.title,
                message: res.data.message,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        } else {
            store.addNotification({
                title: res.data.title,
                message: res.data.message,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    }

    onSubmitCM = async e => {
        e.preventDefault()
        const res = await axios.post('http://localhost:4000/api/cm/register', {
            rut_admin: this.state.rut_admin,
            password: this.state.password,
            nombre_cm: this.state.nombre_cm,
            ubicacion: {
                region: {
                    _id: this.state.idRegion,
                    nombre: this.state.region
                },
                ciudad: {
                    _id: this.state.idCiudad,
                    nombre: this.state.ciudad
                }
            },
            direccion: this.state.direccion,
            telefono: this.state.telefono,
            correo: this.state.email
        })

        if (res.data.auth) {
            this.notification(res.data.title, res.data.message, "success")
        } else {
            this.notification(res.data.title, res.data.message, "warning")
        }
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelectRegion = e => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            idRegion: e.target.options[selectedIndex].getAttribute('id'),
            region: e.target.value
        })
    }

    onSelectCiudad = e => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            idCiudad: e.target.options[selectedIndex].getAttribute('id'),
            ciudad: e.target.value
        })
    }

    onSelectCM = e => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            idCentroMedico: e.target.options[selectedIndex].getAttribute('id'),
            centroMedico: e.target.value
        })
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="jumbotron jumbotron-fluid shadow mb-5 bg-light rounded">
                    <div className="container">
                        <h1 className="display-4">Registro de usuario</h1>
                        <p className="lead">Seleccione su rol de usuario a registrar y complete con los datos solicitados.</p>
                    </div>
                </div>

                <div className="container pb-5">
                    <Tabs>
                        <TabList>
                            <Tab>Paciente</Tab>
                            <Tab>Centro Medico</Tab>
                        </TabList>

                        {/* Paciente */}
                        <TabPanel>
                            <form onSubmit={this.onSubmitPaciente} className="container mt-3 pb-3">
                                <div className="card mb-3">
                                    <h5 className="card-header">Informacion personal</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtRUTP">Cedula de identidad</label>
                                                <input type="text" className="form-control" name="rut" id="txtRUTP" placeholder="11222333-4" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtNombresP">Nombres</label>
                                                <input type="text" className="form-control" id="txtNombresP" name="nombres" placeholder="Juan Andrés" onChange={this.onInputChange} required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtApellidosP">Apellidos</label>
                                                <input type="text" className="form-control" id="txtApellidosP" name="apellidos" placeholder="Pérez Cotapos" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="dpFecNacimientoP">Fecha de nacimiento</label>
                                                <input type="date" className="form-control" id="dpFecNacimientoP" name="fecha_nacimiento" placeholder="Juan Andrés" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtPassP2">Contraseña</label>
                                                <input type="password" className="form-control" name="password" id="txtPassP2" placeholder="**********" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <h5 className="card-header">Zona de residencia y atencion medica.</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxRegionP">Region</label>
                                                <select className="form-control" name="region" onChange={this.onSelectRegion} id="cbxRegionP" >
                                                    <option value="" >Seleccione Region</option>
                                                    {
                                                        this.state.regiones.map(region =>
                                                            <option
                                                                id={region._id}
                                                                key={region._id}
                                                                onClick={() => this.cargarCiudades(region._id)}>
                                                                {region.nombre}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxCiudadP">Ciudad</label>
                                                <select className="form-control" onChange={this.onSelectCiudad} name="ciudad" id="cbxCiudadP">
                                                    <option value="" >Seleccione Ciudad</option>
                                                    {
                                                        this.state.ciudades.map(ciudad =>
                                                            <option
                                                                key={ciudad._id}
                                                                id={ciudad._id}
                                                                onClick={() => this.cargarCMs(ciudad._id)}>
                                                                {ciudad.nombre}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtDireccionP">Dirección</label>
                                                <input type="text" className="form-control" id="txtDireccionP" onChange={this.onInputChange} name="direccion" placeholder="Av Las flores 111, Poblacion El Bosque" required></input>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="cbxCMP">Centro de atencion medica</label>
                                                <select className="form-control" name="centroMedico" onChange={this.onSelectCM} id="cbxCMP">
                                                    <option value="">Seleccione Centro Medico</option>
                                                    {
                                                        this.state.centrosMedicos.map(centro =>
                                                            <option
                                                                key={centro._id}
                                                                id={centro._id}
                                                                onClick={() => this.onSelectChange}
                                                                onBlur={() => this.limpiarCMs}>
                                                                {centro.nombre_cm}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card mb-3">
                                    <h5 className="card-header">Informacion de Contacto</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtEmailP">Correo Electronico</label>
                                                <input type="text" className="form-control" id="txtEmailP" onChange={this.onInputChange} name="email" placeholder="example@example.cl" required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtTelP">Telefono</label>
                                                <input type="number" className="form-control" id="txtTelP" onChange={this.onInputChange} name="telefono" placeholder="912345678" required></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="checkP" required></input>
                                        <label className="form-check-label" htmlFor="checkP">
                                            Acepto los terminos y Condiciones
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-outline-success btn-lg btn-block" onSubmit={this.onSubmitPaciente} type="submit">Registrarse</button>
                            </form>
                        </TabPanel>

                        {/* Centro Medico */}
                        <TabPanel>
                            <form onSubmit={this.onSubmitCM} className="container mt-3 pb-3">
                                <div className="card mb-3">
                                    <h5 className="card-header">Informacion de Centro de Atencion Medica</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtRUTCM">RUT Administrador de Centro Medico</label>
                                                <input type="text" className="form-control" id="txtRUTCM" name="rut_admin" placeholder="192661544" onChange={this.onInputChange} required></input>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtPassCM">Contraseña</label>
                                                <input type="password" className="form-control" id="txtPassCM" name="password" placeholder="**********" onChange={this.onInputChange} required></input>
                                            </div>

                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtNombreCM">Nombre Centro Medico</label>
                                                <input type="text" className="form-control" id="txtNombreCM" name="nombre_cm" placeholder="Juan Andrés" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtEmailCM">Correo Electronico</label>
                                                <input type="text" className="form-control" id="txtEmailCM" name="email" placeholder="example@example.cl" onChange={this.onInputChange} required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtTelCM">Telefono</label>
                                                <input type="number" className="form-control" id="txtTelCM" name="telefono" placeholder="912345678" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <h5 className="card-header">Zona de residencia y atencion medica.</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxRegionCM">Region</label>
                                                <select className="form-control" name="region" id="cbxRegionCM" onChange={this.onSelectRegion}>
                                                    <option value=""  >Seleccione Region</option>
                                                    {
                                                        this.state.regiones.map(region =>
                                                            <option
                                                                id={region._id}
                                                                key={region._id}
                                                                onClick={() => this.cargarCiudades(region._id)}>
                                                                {region.nombre}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxCiudadCM">Ciudad</label>
                                                <select className="form-control" name="ciudad" id="cbxCiudadCM" onChange={this.onSelectCiudad}>
                                                    <option value="" >Seleccione Ciudad</option>
                                                    {
                                                        this.state.ciudades.map(ciudad =>
                                                            <option
                                                                key={ciudad._id}
                                                                id={ciudad._id}
                                                                onClick={() => this.cargarCMs(ciudad._id)}>
                                                                {ciudad.nombre}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtDireccionCM">Dirección</label>
                                                <input type="text" className="form-control" id="txtDireccionCM" name="direccion" placeholder="Av Las flores 111, Poblacion El Bosque" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>

                                        <div className="form-group mt-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="checkCM" required></input>
                                                <label className="form-check-label" htmlFor="checkCM">
                                                    Acepto los terminos y Condiciones
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" onSubmit={this.onSubmitCM} className="btn btn-outline-success btn-lg btn-block" >Registrar Centro Medico</button>
                            </form>
                        </TabPanel>
                    </Tabs>
                </div>
            </div >
        )
    }
}
