const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Estado = sequelize.define(
  'Estado',
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
    NombreEstado: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    seccion: {
      type: DataTypes.STRING,
      allowNull: false,      
      required: true,
    }
  },
);

module.exports = Estado;