const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipoFacturacion = sequelize.define(
  'tipo_facturacion',
  {
    id_tipo_facturacion: {
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

module.exports = TipoFacturacion;