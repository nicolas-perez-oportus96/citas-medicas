import React from 'react';
//Importando Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/Navbar'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Footer />
    </Router>
  );
}

export default App;
