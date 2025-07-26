const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Rol = sequelize.define(
  'Rol',
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
        required: true,
      },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    }
);


module.exports = Rol;