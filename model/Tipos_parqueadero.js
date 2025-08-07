const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipoParqueadero = sequelize.define(
  'tipo_parqueadero',
  {
    id_tipo_parqueadero: {
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

module.exports = TipoParqueadero;