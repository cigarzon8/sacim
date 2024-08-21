const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');
const Estado = require('./Estado')

const Parqueadero = sequelize.define(
  'Parqueadero',
  {
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: Estado,
          key: 'id',
        }
      },
    tipoveparqueadero: {
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
Parqueadero.belongsTo(Estado, { foreignKey: 'tipoveparqueadero', as: 'EstadoparqueaderoRelacion' });
Parqueadero.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });

//Parqueadero.sync({ force: true });

module.exports = Parqueadero;