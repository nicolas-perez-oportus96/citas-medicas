//DATA MODEL para citas medicas
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const RegionSchema = require('./schemes/Region.schema')

const CentroMedicoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
}, { _id: false })

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
    },
    ubicacion: RegionSchema,
    centroMedico: CentroMedicoSchema,
    telefono: {
        type: Number,
    },
    correo: {
        type: String,
    },
});

PacienteSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

PacienteSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('Paciente', PacienteSchema);