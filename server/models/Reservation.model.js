import sequelize from "../db.js";
import {DataTypes} from 'sequelize';
import Time_slots from "./time_slot.models.js";
const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'projects', // Nombre de la tabla referenciada
          key: 'id', // Columna referenciada
        },
      },
    service: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    clientName: DataTypes.STRING,
    clientPhone: DataTypes.STRING,
    email: {
          type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
      defaultValue: 'Pendiente'
    }
  },{tableName: 'reservation',
  timestamps: true});
// Un Reservation tiene muchos TimeSlots
Reservation.hasMany(Time_slots, { foreignKey: 'id_reservation' });
Time_slots.belongsTo(Reservation, { foreignKey: 'id_reservation' });

export default Reservation;