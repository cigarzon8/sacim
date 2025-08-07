const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipoRenta = sequelize.define(
  'tipo_renta',
  {
    id_tipo_renta: {
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

module.exports = TipoRenta;