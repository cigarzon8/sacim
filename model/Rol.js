const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Rol = sequelize.define(
  'Rol',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      }
  }
);


module.exports = Rol;