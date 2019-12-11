//DATA MODEL para citas medicas
const { Schema, model } = require('mongoose');

const UbicacionSchema = new Schema({
    region: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    }
})

const PacienteSchema = new Schema({
    rut: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    ubicacion: UbicacionSchema,
    telefono: {
        type: Number,
    },
    correo: {
        type: String,
    },
});

module.exports = model('Paciente', PacienteSchema);