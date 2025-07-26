const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Estado = sequelize.define(
  'Estado',
  {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
    nombre_estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false,      
      required: true,
    },
    id_categoria: {
      type: DataTypes.INTEGER(10),
      allowNull: false,      
      required: true,
    }
  },
);

module.exports = Estado;