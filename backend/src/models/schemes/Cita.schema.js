//DATA MODEL para citas medicas
const { Schema } = require('mongoose');

const CitaSchema = new Schema({
    paciente: {
        id: {
            type: String,
            required: true
        },
        rut: {
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
    },
    areaMedica: {
        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

module.exports = CitaSchema;