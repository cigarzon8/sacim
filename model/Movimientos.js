const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Movimiento = sequelize.define(
  'Movimiento',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    placa: {
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


module.exports = Movimiento;