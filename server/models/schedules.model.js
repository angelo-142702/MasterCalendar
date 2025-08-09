import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Appointment from './appointments.model.js';
    const Schedule = sequelize.define('Schedule', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects', // Asegúrate de que coincida con el nombre de tu tabla de proyectos
          key: 'id'
        }
      },
      day_of_week: {
        type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),
        allowNull: false,
        validate: {
          notEmpty: true, // No permite strings vacíos
        }
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      timestamps: false, // Opcional: agrega createdAt y updatedAt
      tableName: 'schedules' // Opcional: define el nombre de la tabla
    });
    
// relacion entre Schedules y appoinments
  Schedule.hasMany(Appointment, { foreignKey: 'id_schedule' } );
  Appointment.belongsTo(Schedule, { foreignKey: 'id_schedule' } );

export default Schedule;