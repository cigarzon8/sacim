const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');
const Estado = require('./Estado')
const Vehiculo = require('./Estado')

const User = sequelize.define(
  'User',
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      unique: true,
    },
    documento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: Estado,
        key: 'id',
      }
    },
  },
  {
    // Other model options go here
  },
);
User.belongsTo(Estado, { foreignKey: 'estado' });
User.hasMany(Vehiculo, { foreignKey: 'id' });
//User.sync({ force: true });

module.exports = User;