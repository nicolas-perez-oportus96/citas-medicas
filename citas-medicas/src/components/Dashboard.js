import React, { Component } from 'react'
import { getToken } from '../helpers/Token'

export default class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            token:'',
            user: this.props.user
        }
    };

    componentDidMount(){
        const jwt = require('jsonwebtoken')
        const token = getToken();
        const user = jwt.decode(token)
        console.log(user) 
    }

    render() {
        return (
            <div>
                <h1>Escritorio paciente</h1>
            </div>
        )
    }
}
