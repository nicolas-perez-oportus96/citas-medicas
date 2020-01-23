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
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import Footer from './components/Footer'

import AuthComponent from './components/AuthComponent'
import Dashboard from './components/Dashboard'
import DatosPaciente from './components/DatosPaciente'

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
          </AuthComponent>
          
          <Route path="/escritorio/datos" component={DatosPaciente} />


        </Switch>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
