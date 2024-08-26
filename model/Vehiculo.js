const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');
const Estado = require('./Estado')

const Vehiculo = sequelize.define(
  'Vehiculo',
  {
    idusuario: {
      type: DataTypes.INTEGER,
      allowNull: false,      
      required: false
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    tipovehiculo: {
      type: DataTypes.INTEGER,
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
module.exports = Vehiculo;