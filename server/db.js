import mysql from "mysql2";
import { Sequelize } from 'sequelize';

/* export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app'
}); */


// Configura la conexión a la base de datos
export const sequelize = new Sequelize('macro', 'root', '', {
  host: 'localhost', // Cambia esto si tu base de datos está en otro servidor
  dialect: 'mysql',  // Especifica que estás usando MySQL
  logging: false
});


export default sequelize;
// Conectar a la base de datos
