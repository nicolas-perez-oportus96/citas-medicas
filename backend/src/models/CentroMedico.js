//DATA MODEL para centros medicos
const { Schema, model } = require('mongoose');

const RegionSchema = require('./schemes/Region.schema')

//Schema de citas //no utilizado aun
const CitaSchema = new Schema({
    id_paciente: {
        type: String,
        required: true
    },
    id_area_Atencion: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


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
    ubicacion: RegionSchema,
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