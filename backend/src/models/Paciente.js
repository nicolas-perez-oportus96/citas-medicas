//DATA MODEL para citas medicas
const { Schema, model } = require('mongoose');

const pacienteSchema = new Schema({
    rut: {
        type: String,
        required,
        unique: true
    },
    password: {
        type: String,
        required
    },
    nombres: {
        type: String,
        required
    },
    apellidos: {
        type: String,
        required
    },
    fecha_nacimiento: {
        type: Date,
        required
    },
    telefono: {
        type: Number,
    },
    correo: {
        type: String,
    },
})

module.exports = model('Paciente', pacienteSchema);