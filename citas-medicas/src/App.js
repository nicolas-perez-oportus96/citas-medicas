import React from 'react';
//Importando Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'



import NavBar from './components/Navbar'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <ReactNotification />
      <Router>
      <NavBar />
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Footer />
    </Router>
    </div>
   
  );
}

export default App;
