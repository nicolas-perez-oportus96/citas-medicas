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
app.use('/api/region', require('./routes/regiones'))
app.use('/api/paciente', require('./routes/pacientes'))
app.use('/api/cm', require('./routes/centrosMedicos'))


module.exports = app;
