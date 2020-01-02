import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios'
export default class Register extends Component {

    state = {
        regiones: [],
        ciudades: [],
        centrosMedicos: []
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/region/')
        this.setState({ regiones: res.data })
    }

    async cargarCiudades(id) {
        const res = await axios.get('http://localhost:4000/api/region/' + id + "/cities")
        this.setState({ ciudades: res.data })
    }

    async cargarCMs(idCiudad) {
        const res = await axios.get("http://localhost:4000/api/cm/bycity/" + idCiudad)
        this.setState({ centrosMedicos: res.data })
    }

    render() {

        return (
            <div>
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
                            <form className="container mt-3 pb-3">
                                <div className="card mb-3">
                                    <h5 className="card-header">Informacion personal</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtRUTP">Cedula de identidad</label>
                                                <input type="text" className="form-control" id="txtRUTP" placeholder="11222333-4" required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtNombresP">Nombres</label>
                                                <input type="text" className="form-control" id="txtNombresP" placeholder="Juan Andrés" required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtApellidosP">Apellidos</label>
                                                <input type="text" className="form-control" id="txtApellidosP" placeholder="Pérez Cotapos" required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="dpFecNacimientoP">Fecha de nacimiento</label>
                                                <input type="date" className="form-control" id="dpFecNacimientoP" placeholder="Juan Andrés" required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtPassP">Contraseña</label>
                                                <input type="text" className="form-control" id="txtPassP" placeholder="**********" required></input>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtPassP2">Repite contraseña</label>
                                                <input type="text" className="form-control" id="txtPassP2" placeholder="**********" required></input>
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
                                                <select className="form-control" id="cbxRegionP" >
                                                    {
                                                        this.state.regiones.map(region =>
                                                            <option
                                                                key={region._id}
                                                                onClick={() => this.cargarCiudades(region._id)}>
                                                                {region.nombre}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxCiudadP">Ciudad</label>
                                                <select className="form-control" id="cbxCiudadP">
                                                    {
                                                        this.state.ciudades.map(ciudad =>
                                                            <option
                                                                key={ciudad._id}
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
                                                <input type="text" className="form-control" id="txtDireccionP" placeholder="Av Las flores 111, Poblacion El Bosque" required></input>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="cbxCMP">Centro de atencion medica</label>
                                                <select className="form-control" id="cbxCMP">
                                                    {
                                                        this.state.centrosMedicos.map(centro =>
                                                            <option
                                                                key={centro._id}
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
                                                <input type="text" className="form-control" id="txtEmailP" placeholder="example@example.cl" required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtTelP">Telefono</label>
                                                <input type="number" className="form-control" id="txtTelP" placeholder="912345678" required></input>
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

                                <Link className="btn btn-outline-success btn-lg btn-block" to="" type="submit">Registrarse</Link>
                            </form>
                        </TabPanel>

                        {/* Centro Medico */}
                        <TabPanel>
                            <form className="container mt-3 pb-3">
                                <div className="card mb-3">
                                    <h5 className="card-header">Informacion de Centro de Atencion Medica</h5>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtRUTCM">RUT Administrador de Centro Medico</label>
                                                <input type="text" className="form-control" id="txtRUTCM" placeholder="192661544" required></input>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtNombreCM">Nombre del Centro de Atencion Medica</label>
                                                <input type="text" className="form-control" id="txtNombreCM" placeholder="Juan Andrés" required></input>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtEmailCM">Correo Electronico</label>
                                                <input type="text" className="form-control" id="txtEmailCM" placeholder="example@example.cl" required></input>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtTelCM">Telefono</label>
                                                <input type="number" className="form-control" id="txtTelCM" placeholder="912345678" required></input>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtPassCM">Contraseña</label>
                                                <input type="text" className="form-control" id="txtPassCM" placeholder="**********" required></input>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="txtValPassCM">Repite contraseña</label>
                                                <input type="text" className="form-control" id="txtValPassCM" placeholder="**********" required></input>
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
                                                <select className="form-control" id="cbxRegionCM">
                                                    {
                                                        this.state.regiones.map(region =>
                                                            <option
                                                                key={region._id}
                                                                onClick={() => this.cargarCiudades(region._id)}>
                                                                {region.nombre}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cbxCiudadCM">Ciudad</label>
                                                <select className="form-control" id="cbxCiudadCM">
                                                    {
                                                        this.state.ciudades.map(ciudad =>
                                                            <option
                                                                key={ciudad._id}>
                                                                {ciudad.nombre}
                                                            </option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="txtDireccionCM">Dirección</label>
                                                <input type="text" className="form-control" id="txtDireccionCM" placeholder="Av Las flores 111, Poblacion El Bosque" required></input>
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
                                <Link className="btn btn-outline-success btn-lg btn-block" to="#">Registrar Centro Medico</Link>
                            </form>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}
