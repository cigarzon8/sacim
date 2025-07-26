const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Parqueadero = sequelize.define(
  'Parqueadero',
  {
    id_parqueadero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    tipovehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    tipoveparqueadero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
    tipousuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
  }
);


module.exports = Parqueadero;