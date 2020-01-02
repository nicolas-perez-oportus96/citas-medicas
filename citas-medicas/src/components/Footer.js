import React, { Component } from 'react'
import logo from '../img/favicon.png'


export default class Footer extends Component {
    render() {
        return (
            <div className="site-footer fixed-bottom">
                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-between">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""></img>
                        <span className="text-light">Sistema de Horas Medicas <span className="badge badge-primary">Beta</span></span>
                    </div>
                </div>
            </div>

        )
    }
}
