//DATABASE: Establece parametros de conexion a base de datos.
const mongoose = require("mongoose");

const URI = process.env.DB_URI;

mongoose.connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Base de datos conectada");
});
