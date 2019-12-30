import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
