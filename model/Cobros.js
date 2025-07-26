const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Cobro = sequelize.define(
  'Cobro',
  {
    id_cobro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      tiempo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      fechainicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      fechafin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      fechacobro: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      tipoveparqueadero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
    vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
  },
  }
);


module.exports = Cobro;