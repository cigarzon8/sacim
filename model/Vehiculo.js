const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');
const Estado = require('./Estado')

const Vehiculo = sequelize.define(
  'Vehiculo',
  {
    idusuario: {
      type: DataTypes.INTEGER,
      allowNull: false,      
      required: false
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    tipovehiculo: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      references: {
        model: Estado,
        key: 'id',
      }
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
Vehiculo.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
Vehiculo.belongsTo(Estado, { foreignKey: 'tipovehiculo', as: 'TipoVehiculoRelacion' });


//Vehiculo.sync({ force: true });

module.exports = Vehiculo;