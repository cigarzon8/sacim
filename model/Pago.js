const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Pago = sequelize.define(
  'Pago',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
    tiporenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      idIngreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      idSalida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
       pagoEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
       usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      }, 
       proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      }, 
       Valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      }, 
       facturaElectronica: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        required: true,
      }, 
    }
);


module.exports = Pago;