import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default class Login extends Component {
    render() {
        return (
            <div className="signIn">
                <div className="container">
                    <div className="card border-1 shadow bg-white rounded mt-2">
                        <div className="card-body p-5">
                            <h1 className="font-weight-light">Iniciar Sesion</h1>
                            <br />

                            <Tabs>
                                <TabList>
                                    <Tab>Paciente</Tab>
                                    <Tab>Centro Medico</Tab>
                                </TabList>

                                <TabPanel>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="rutP">Cedula de Identidad del Paciente</label>
                                            <input type="email" className="form-control" id="rutP" aria-describedby="emailHelp"
                                                placeholder="11222333-4"></input>
                                            <small id="emailHelp" className="form-text text-muted">Tu sesion, perfil y datos asociados a este
                                                estan cifrados y son validos solo durante esta sesion.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="txtPassP">Contraseña</label>
                                            <input type="password" className="form-control" id="txtPassP" placeholder="Contraseña"></input>
                                        </div>

                                        <Link type="submit" className="btn btn-primary" to="">Iniciar Sesion</Link>
                                    </form>
                                </TabPanel>
                                <TabPanel>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="txtRutAdmin">Cedula de Identidad Administrador</label>
                                            <input type="email" className="form-control" id="txtRutAdmin" aria-describedby="emailHelp"
                                                placeholder="11222333-4"></input>
                                            <small id="emailHelp" className="form-text text-muted">Tu sesion, perfil y datos asociados a este
                                                estan cifrados y son validos solo durante esta sesion.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="txtPassAdmin">Contraseña</label>
                                            <input type="password" className="form-control" id="txtPassAdmin" placeholder="Contraseña"></input>
                                        </div>

                                        <Link type="submit" className="btn btn-primary" to="">Iniciar Sesion</Link>
                                    </form>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
