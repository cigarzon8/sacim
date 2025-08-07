const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const TipoDocumentos = sequelize.define(
  'tipo_documentos',
  {
    id_tipo_documento: {
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

module.exports = TipoDocumentos;