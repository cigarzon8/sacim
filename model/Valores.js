const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Valores = sequelize.define(
  'valores',
  {
    id_valor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
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
    tipofacturacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }
    }
);


module.exports = Valores;