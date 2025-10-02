const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Vehiculo = sequelize.define(
  'Vehiculo',
  {
    id_vehiculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    placa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      required: true,
      unique: true,
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
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    parqueadero_asignado: {
      type: DataTypes.STRING(100),
      allowNull: true,
      required: false,
      unique: false,
    },
    tipousuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
  }
);
module.exports = Vehiculo;