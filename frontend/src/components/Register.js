//Importando librerias
import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { showNotification } from '../helpers/Notification'
import NavBar from '../components/Navbar'


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
        //consultando regiones
        const res = await axios.get('http://localhost:4000/api/region/')
        this.setState({
            regiones: res.data,
            idRegion: res.data[0]._id,
            region: res.data[0].nombre
        })
    }

    async cargarCiudades(id) {
        //consultando ciudades de region
        const res = await axios.get('http://localhost:4000/api/region/' + id + "/cities")
        this.setState({ ciudades: res.data })
    }

    async cargarCMs(idCiudad) {
        //consultando centros medicos por ciudad
        const res = await axios.get("http://localhost:4000/api/cm/bycity/" + idCiudad)
        this.setState({ centrosMedicos: res.data })
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
            showNotification(res.data.title, res.data.message, "success")
            this.props.history.push('/login')
        } else {
            showNotification(res.data.title, res.data.message, "warning")
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
            showNotification(res.data.title, res.data.message, "success")
            this.props.history.push('/adminlogin')
        } else {
            showNotification(res.data.title, res.data.message, "warning")
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
                <div className="hero register shadow mb-5 bg-light rounded">
                    <div className="container">
                        <h1 className="display-4 mb-2">Registro de Usuarios</h1>
                        <hr className="m-0 text-white"></hr>
                        <p className="lead mt-4">Seleccione su tipo de usuario y complete con los datos solicitados.</p>
                    </div>
                </div>

                <div className="container pb-5">
                    <Tabs>
                        <TabList>
                            <Tab>Paciente</Tab>
                            <Tab>Centro M&eacute;dico</Tab>
                        </TabList>

                        {/* Paciente */}
                        <TabPanel>
                            <form onSubmit={this.onSubmitPaciente} className="container mt-3 pb-3">
                                <div className="card mb-3">
                                    <h5 className="card-header">Informaci&oacute;n personal</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtRUTP">Cedula de identidad:</label>
                                                <input type="text" className="form-control" name="rut" id="txtRUTP" placeholder="11222333-4" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtNombresP">Nombres:</label>
                                                <input type="text" className="form-control" id="txtNombresP" name="nombres" placeholder="Juan Andrés" onChange={this.onInputChange} required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtApellidosP">Apellidos:</label>
                                                <input type="text" className="form-control" id="txtApellidosP" name="apellidos" placeholder="Pérez Cotapos" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="dpFecNacimientoP">Fecha de nacimiento:</label>
                                                <input type="date" className="form-control" id="dpFecNacimientoP" name="fecha_nacimiento" placeholder="Juan Andrés" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtPassP2">Contrase&ntilde;a:</label>
                                                <input type="password" className="form-control" name="password" id="txtPassP2" placeholder="**********" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <h5 className="card-header">Zona de residencia y atenci&oacute;n m&eacute;dica.</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxRegionP">Regi&oacute;n:</label>
                                                <select className="form-control" name="region" onChange={this.onSelectRegion} id="cbxRegionP" >
                                                    <option value="" >Seleccione Regi&oacute;n:</option>
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
                                                <label htmlFor="cbxCiudadP">Ciudad:</label>
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
                                                <label htmlFor="txtDireccionP">Direcci&oacute;n:</label>
                                                <input type="text" className="form-control" id="txtDireccionP" onChange={this.onInputChange} name="direccion" placeholder="Av Las flores 111, Poblaci&oacute;n El Bosque" required></input>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="cbxCMP">Centro de Atenci&oacute;n M&eacute;dica:</label>
                                                <select className="form-control" name="centroMedico" onChange={this.onSelectCM} id="cbxCMP">
                                                    <option value="">Seleccione Centro M&eacute;dico</option>
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
                                    <h5 className="card-header">Informaci&oacute;n de Contacto</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtEmailP">Correo electr&oacute;nico:</label>
                                                <input type="text" className="form-control" id="txtEmailP" onChange={this.onInputChange} name="email" placeholder="example@example.cl" required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtTelP">Tel&eacute;fono:</label>
                                                <input type="number" className="form-control" id="txtTelP" onChange={this.onInputChange} name="telefono" placeholder="912345678" required></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="checkP" required></input>
                                        <label className="form-check-label" htmlFor="checkP">Confirmo que los datos ingresados son correctos...</label>
                                    </div>
                                </div>
                                <button className="btn btn-outline-success btn-lg btn-block" onSubmit={this.onSubmitPaciente} type="submit">Registrarse</button>
                            </form>
                        </TabPanel>

                        {/* Centro Medico */}
                        <TabPanel>
                            <form onSubmit={this.onSubmitCM} className="container mt-3 pb-3">
                                <div className="card mb-3">
                                    <h5 className="card-header">Informaci&oacute;n del Centro de Atenci&oacute;n M&eacute;dica</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtRUTCM">RUT Administrador de Centro M&eacute;dico:</label>
                                                <input type="text" className="form-control" id="txtRUTCM" name="rut_admin" placeholder="192661544" onChange={this.onInputChange} required></input>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtPassCM">Contrase&ntilde;a:</label>
                                                <input type="password" className="form-control" id="txtPassCM" name="password" placeholder="**********" onChange={this.onInputChange} required></input>
                                            </div>

                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtNombreCM">Nombre del Centro M&eacute;dico:</label>
                                                <input type="text" className="form-control" id="txtNombreCM" name="nombre_cm" placeholder="Juan Andrés" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtEmailCM">Correo electr&oacute;nico:</label>
                                                <input type="text" className="form-control" id="txtEmailCM" name="email" placeholder="example@example.cl" onChange={this.onInputChange} required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtTelCM">Tel&eacute;fono:</label>
                                                <input type="number" className="form-control" id="txtTelCM" name="telefono" placeholder="912345678" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <h5 className="card-header">Ubicaci&oacute;n</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxRegionCM">Regi&oacute;n:</label>
                                                <select className="form-control" name="region" id="cbxRegionCM" onChange={this.onSelectRegion}>
                                                    <option value=""  >Seleccione Regi&oacute;n</option>
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
                                                <label htmlFor="cbxCiudadCM">Ciudad:</label>
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
                                                <label htmlFor="txtDireccionCM">Direcci&oacute;n:</label>
                                                <input type="text" className="form-control" id="txtDireccionCM" name="direccion" placeholder="Av Las flores 111, Poblacion El Bosque" onChange={this.onInputChange} required></input>
                                            </div>
                                        </div>

                                        <div className="form-group mt-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="checkCM" required></input>
                                                <label className="form-check-label" htmlFor="checkCM">Confirmo que los datos ingresados son correctos...</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" onSubmit={this.onSubmitCM} className="btn btn-outline-success btn-lg btn-block" >Registrar Centro M&eacute;dico</button>
                            </form>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}
