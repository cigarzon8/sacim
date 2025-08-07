const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipousVehiculo = sequelize.define(
  'tipo_vehiculo',
  {
    id_tipo_vehiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
    nombre_estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    } },
);

module.exports = TipousVehiculo;