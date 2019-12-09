//DATABASE: Establece parametros de conexion a base de datos.
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log("Base de datos conectada!"))
    .catch(err => console.log(err));