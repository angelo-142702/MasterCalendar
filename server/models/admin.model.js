import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './user.model.js';
import Category from './category.model.js';
import Representante from './representantes.model.js';
import Reservation from './Reservation.model.js';
import Service from './service.model.js';
import Schedule from './schedules.model.js';
import Appointment from './appointments.model.js';
import Time_slots from './time_slot.models.js';
const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Nombre de la tabla a la que hace referencia
            key: 'id',      // Columna a la que hace referencia
        },
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category', // Nombre de la tabla a la que hace referencia
            key: 'id',           // Columna a la que hace referencia
        },
    },
    logo: {
      type: DataTypes.STRING, // Almacena la URL o ruta del logo
      allowNull: true, // Puede ser opcional
  },
}, {
    timestamps: true, // Habilita createdAt y updatedAt
  tableName:'projects'
  });
Project.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Project, { foreignKey: 'id_user' });
//definir la relacion de Representante y Prject
Project.hasMany(Representante, {foreignKey: 'id_project'});
Representante.belongsTo(Project, {foreignKey: 'id_project'});

Project.hasMany(Service, {foreignKey: 'id_project'})
Service.belongsTo(Project, {foreignKey: 'id_project'})
// Definir la relación entre Project y Category
Project.belongsTo(Category, { foreignKey: 'id_category' });
Category.hasMany(Project, { foreignKey: 'id_category' });
//defenir la relacion de proyecto y  reservation 
Project.hasMany(Reservation, {foreignKey: 'id_project'})
Reservation.belongsTo(Project, {foreignKey: 'id_project'})
// definir relacion de proyecto con shedules horarios
Project.hasMany(Schedule, { foreignKey: 'id_project' } );
Schedule.belongsTo(Project, { foreignKey: 'id_project' } );

Project.hasMany(Appointment, { foreignKey: 'id_project' } );
Appointment.belongsTo(Project, { foreignKey: 'id_project' } );

Project.hasMany(Time_slots, { foreignKey: 'id_project' })
Time_slots.belongsTo(Project, { foreignKey: 'id_project' } );

export default Project;