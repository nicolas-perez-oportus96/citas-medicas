//DATA MODEL para centros medicos
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const RegionSchema = require('./schemes/Region.schema')
const CitaSchema = require('./schemes/Cita.schema')

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
});

CmSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

CmSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
}
module.exports = model('CentroMedico', CmSchema);