//DATA MODEL para centros medicos
const { Schema, model } = require('mongoose');
const timeZone = require('mongoose-timezone');

const RegionSchema = require('./schemes/Region.schema')

//Schema de citas
const CitaSchema = new Schema({
    paciente: {
        _id: {
            type: String
        },
        nombre: {
            type: String
        }
    },
    areaMedica: {
        _id: {
            type: String
        },
        nombre: {
            type: String
        }
    },
    fecha: {
        type: Date
    }
});

CitaSchema.plugin(timeZone, { paths: ['fecha'] });

//Schema de areas medicas
const AreaMedicaSchema = new Schema({
    nombre: String
});


//Schema de centro medico
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
    areasMedicas: [AreaMedicaSchema],
    citas: [CitaSchema]
})

module.exports = model('CentroMedico', CmSchema);