const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const Estado = sequelize.define(
  'Estado',
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
    NombreEstado: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    seccion: {
      type: DataTypes.STRING,
      allowNull: false,      
      required: true,
    }
  },
  {
    // Other model options go here
  },
);
/*Estado.sync({ force: true }).then(() => {
    // Agregar estados por defecto
    return Estado.bulkCreate([
      {id:1, NombreEstado: 'Activo', seccion: 'General' },
      {id:2, NombreEstado: 'Inactivo', seccion: 'General' },
      {id:3, NombreEstado: 'Pendiente', seccion: 'Administrativo' },
      {id:4, NombreEstado: 'Carro', seccion: 'vehiculo' },
      {id:5, NombreEstado: 'Moto', seccion: 'vehiculo' },
      {id:6, NombreEstado: 'Camioneta', seccion: 'vehiculo' },
    ]);
  }).then(() => {
    console.log('Estados por defecto agregados exitosamente.');
  }).catch((error) => {
    console.error('Error al agregar estados por defecto:', error);
  });*/

module.exports = Estado;