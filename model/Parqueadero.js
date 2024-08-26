const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Parqueadero = sequelize.define(
  'Parqueadero',
  {
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
  }
);


module.exports = Parqueadero;