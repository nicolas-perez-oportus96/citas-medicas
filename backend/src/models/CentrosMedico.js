//DATA MODEL para citas medicas
const { Schema, model } = require('mongoose');

const cmSchema = new Schema({
    rut_admin: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombres_cm: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    telefono: {
        type: Number,
    },
    correo: {
        type: String,
    },
})

module.exports = model('CentroMedico', cmSchema);