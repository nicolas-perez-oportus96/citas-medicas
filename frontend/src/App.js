import React from 'react';
//Importando Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

//components
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/paciente/Login'
import AdminLogin from './components/admin/AdminLogin'
import Footer from './components/Footer'

import AuthComponent from './components/AuthComponent'
import Dashboard from './components/paciente/Dashboard'
import DatosPaciente from './components/paciente/DatosPaciente'
import NewCita from './components/paciente/NewCita'

import AdminDashboard from './components/admin/AdminDashboard'
import DatosCentro from './components/admin/DatosCentro'
import CitasArea from './components/admin/CitasArea'

function App() {
  return (
    <div className="app-container">
      <ReactNotification />
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/adminlogin" component={AdminLogin} />
          <AuthComponent>
            <Route path="/escritorio" component={Dashboard} />
            <Route path="/paciente" component={DatosPaciente} />
            <Route path="/newCita" component={NewCita} />
            <Route path="/centroMedico" component={AdminDashboard}/>
            <Route path="/micentro" component={DatosCentro}/>
            <Route path="/citas/:id" component={CitasArea}/>
          </AuthComponent>
        </Switch>
      </Router>
      <Footer />
    </div>

  );
}

export default App;
