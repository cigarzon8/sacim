const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');


const User = sequelize.define(
  'User',
  {
    intusuario: {
      type: DataTypes.INTEGER ,
      allowNull: false,
      required: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,      
      required: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    documento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
  },
  {
    // Other model options go here
  },
);
User.sync({ force: true });

module.exports = User;