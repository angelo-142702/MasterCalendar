import  {  DataTypes } from 'sequelize';
import sequelize from '../db.js';
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{tableName:'category', timestamps: false});

export default Category;