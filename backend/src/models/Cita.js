//DATA MODEL para citas medicas
const { Schema, model } = require('mongoose');

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

module.exports = model('Cita', CitaSchema);