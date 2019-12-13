//DATA MODEL para Ubicaciones (region y ciudad)
const { Schema, model } = require('mongoose');

const CiudadSchema = new Schema({
    nombre: {
        type: String,
    }
})

const RegionSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    ciudad: [CiudadSchema]
});

module.exports = model('Region', RegionSchema);