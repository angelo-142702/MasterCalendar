// models/Plan.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Plan = sequelize.define('Plan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    tableName: 'plans',
    timestamps: false
});

export default Plan;