import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

  const Representante = sequelize.define('Representante', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'representante',
    timestamps: true,
  });
export default Representante;