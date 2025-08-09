import {app, server, port } from "./app.js";
import sequelize from "./db.js";

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.get("/", (req, res) => {
    res.send("hello world")

})
server.listen(port, ()=> {
console.log("activo en el puerto "+ port);
})