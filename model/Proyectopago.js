const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Proyectopago = sequelize.define(
  'Proyectopago',
  {
    id_pago_proyecto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    pagoestado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }, 
    valor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: true,
      defaultValue:0
    }, 
    fecha_fin_licencia: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
    }, 
    fecha_inici_licencia: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
    }
  }
);


module.exports = Proyectopago;