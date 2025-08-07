const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipousUsuario = sequelize.define(
  'tipo_usuario',
  {
    id_tipo_usuario: {
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

module.exports = TipousUsuario;