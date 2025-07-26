const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Usuario = sequelize.define(
  'Usuario',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,      
      required: true,
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
      unique: true,
    },
    documento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    tipo_documento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
  }
);


module.exports = Usuario;