import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_repre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'representante', // Asume que tienes un modelo de Representantes
            key: 'id'
        }
    },
    id_schedule: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'schedules', // Asume que tienes un modelo de Horarios
            key: 'id'
        }
    },id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'projects', // Nombre de la tabla referenciada
          key: 'id', // Columna referenciada
        },
      },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pending' // Ejemplo: pending, completed, cancelled
    },
    observation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'appointments',
    timestamps: true
});

export default Appointment;