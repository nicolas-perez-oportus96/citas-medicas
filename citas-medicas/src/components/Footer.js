import React, { Component } from 'react'
import logo from '../img/favicon.png'


export default class Footer extends Component {
    render() {
        return (
            <div class="site-footer fixed-bottom">
                <div class="d-flex justify-content-center">
                    <div class="d-flex justify-content-between">
                        <img src={logo} width="30" height="30" class="d-inline-block align-top" alt=""></img>
                        <span class="text-light">Sistema de Horas Medicas <span class="badge badge-primary">Beta</span></span>
                    </div>
                </div>
            </div>

        )
    }
}
