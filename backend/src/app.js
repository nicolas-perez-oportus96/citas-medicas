//APLICACION (server)
const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.SERVER_PORT || 3000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('/api/pacientes', require('./routes/pacientes'))
app.get('/api/centrosMedicos', require('./routes/centrosMedicos'))
app.get('/api/citas', require('./routes/citas'))


module.exports = app;
