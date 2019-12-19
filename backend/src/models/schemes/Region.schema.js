//DATA SCHEMA para almacenar ubicacion dentro de perfiles
const { Schema } = require('mongoose');

const RegionSchema = new Schema({
    region: {
        _id: {
            type: String,
            required: true,
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
        },
        nombre: {
            type: String,
            required: true,
        }
    }
}, { autoIndex: false });

module.exports = RegionSchema;