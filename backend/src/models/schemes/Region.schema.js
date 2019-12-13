//DATA SCHEMA para almacenar ubicacion dentro de perfiles
const { Schema } = require('mongoose');

const RegionSchema = new Schema({
    region: {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true,
        }
    },
    ciudad: {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true,
        }
    }
}, { _id: false });

module.exports = RegionSchema;