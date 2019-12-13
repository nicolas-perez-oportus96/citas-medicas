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
app.use('/api/pacientes', require('./routes/pacientes'))
app.use('/api/centrosMedicos', require('./routes/centrosMedicos'))
app.use('/api/citas', require('./routes/citas'))


module.exports = app;
