import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import User from "./user.model.js"
import Plan from "./plan.model.js"

// models/Subscription.js
const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Referencia al modelo User
            key: 'id'
        }
    },
    id_plan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plan, // Referencia al modelo Plan
            key: 'id'
        }
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    tableName: 'subscriptions',
    timestamps: false
});

// Asociaciones
Subscription.belongsTo(User, { foreignKey: 'id_user' });
Subscription.belongsTo(Plan, { foreignKey: 'id_plan' })

export default Subscription;