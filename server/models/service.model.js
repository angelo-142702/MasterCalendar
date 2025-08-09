import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // Ajusta la ruta según tu configuración

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects', // Nombre de la tabla referenciada
      key: 'id', // Columna referenciada
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},{
  tableName:'service',
  timestamps:false
});

export default Service;