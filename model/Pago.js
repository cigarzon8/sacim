const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Pago = sequelize.define(
  'Pago',
  {
    id_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    id_movimiento_ngreso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    id_movimiento_salida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    estado_pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    tiporenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }, 
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }, 
    Valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }, 
    duracion_parqueo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }
    }
);


module.exports = Pago;