const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipoMovimiento = sequelize.define(
  'tipo_movimiento',
  {
    id_tipo_movimiento: {
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

module.exports = TipoMovimiento;