import React, { Component } from 'react'


export default class Footer extends Component {
    render() {
        return (
            <div className="site-footer fixed-bottom">
                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <img src='/img/favicon.png' width="20" height="20" className="d-inline-block align-top mr-2" alt=""></img>
                        <p className="text-light m-0">Sistema de Horas M&eacute;dicas <span className="badge badge-primary">Beta</span></p>
                    </div>
                </div>
            </div>
        )
    }
}
