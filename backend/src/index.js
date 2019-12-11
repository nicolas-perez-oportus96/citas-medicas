//INDEX: despliega el servidor (app.js) y establece conexion a base de datos.
require("dotenv").config();

const app = require("./app");
require("./database");

async function main() {
  await app.listen(app.get("port"));
  console.log("Server on port", app.get("port"));
}

main();
