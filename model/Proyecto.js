const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Proyecto = sequelize.define(
  'Proyecto',
  {
    id_proyecto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_proyecto: {
        type: DataTypes.STRING(150),
        allowNull: false,
        required: true,
      },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    tiempogratuito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    tiempoalertas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    telefono: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        required: true,
      },
    correo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        required: true,
      }
    }
);


module.exports = Proyecto;