const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipoPagos = sequelize.define(
  'tipo_pagos',
  {
    id_tipo_pagos: {
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

module.exports = TipoPagos;