const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');
const Estado = require('./Estado')
const Vehiculo = require('./Estado')

const Cobro = sequelize.define(
  'Cobro',
  {
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      tiempo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      fechainicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      fechafin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      fechacobro: {
        type: DataTypes.INTEGER,
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
Cobro.belongsTo(Estado, { foreignKey: 'tipoveparqueadero', as: 'TipoParqueaderoRelacion' });
Cobro.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
Cobro.hasMany(Vehiculo, { foreignKey: 'id' });
Cobro.sync({ force: true });

module.exports = Cobro;