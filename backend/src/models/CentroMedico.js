//DATA MODEL para centros medicos
const { Schema, model } = require('mongoose');

const UbicacionSchema = require('./Ubicacion.Schema')

const CmSchema = new Schema({
    rut_admin: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombre_cm: {
        type: String,
        required: true
    },
    ubicacion: UbicacionSchema,
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
    },
    correo: {
        type: String,
    },
})

module.exports = model('CentroMedico', CmSchema);