
import sequelize  from "../db.js";
import { DataTypes } from "sequelize";

    const Time_slots = sequelize.define('time_slots', { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_project: {
            type: DataTypes.INTEGER,
            references: {
                model: 'projects',
                key: 'id'
            }
        },
        id_reservation: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reservation',
                key: 'id'
            }
        },
        date: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        
}, {tableName:'time_slots', timestamps: false});

export default Time_slots;
