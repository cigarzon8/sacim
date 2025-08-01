const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Movimiento = sequelize.define(
  'Movimiento',
  {
    id_movimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    id_vehiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    tipo_movimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }
  }
);


module.exports = Movimiento;