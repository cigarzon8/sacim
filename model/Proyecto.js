const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Proyecto = sequelize.define(
  'Proyecto',
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
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
  }
);


module.exports = Proyecto;