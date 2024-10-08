const { sequelize } = require('./db');


const Estado = require('./model/Estado');
const Vehiculo = require('./model/Vehiculo');
const User = require('./model/User');
const Parqueadero = require('./model/Parqueadero');
const Cobro = require('./model/Cobros')

async function initializeDatabase() {
    /*await Estado.sync({ force: true });
    await Estado.bulkCreate([
        { id: 1, NombreEstado: 'Activo', seccion: 'General' },
        { id: 2, NombreEstado: 'Inactivo', seccion: 'General' },
        { id: 3, NombreEstado: 'Pendiente', seccion: 'Administrativo' },
        { id: 4, NombreEstado: 'Carro', seccion: 'vehiculo' },
        { id: 5, NombreEstado: 'Moto', seccion: 'vehiculo' },
        { id: 6, NombreEstado: 'Camioneta', seccion: 'vehiculo' },
        { id: 7, NombreEstado: 'Ingreso', seccion: 'cobro' },
        { id: 8, NombreEstado: 'Salida', seccion: 'cobro' },
        { id: 9, NombreEstado: 'Pagado', seccion: 'cobro' },
    ]);*/

    await Vehiculo.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    await Vehiculo.belongsTo(Estado, { foreignKey: 'tipovehiculo', as: 'TipoVehiculoRelacion' });
    
    //await Vehiculo.sync({ force: true });

    await User.belongsTo(Estado, { foreignKey: 'estado' });
    await User.hasMany(Vehiculo, { foreignKey: 'id' });
    //await User.sync({ force: true });

    await Parqueadero.belongsTo(Estado, { foreignKey:'tipoveparqueadero', as: 'EstadoparqueaderoRelacion' });
    await Parqueadero.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    //await Parqueadero.sync({ force: true });

    await Cobro.belongsTo(Estado, { foreignKey: 'tipoveparqueadero', as: 'TipoParqueaderoRelacion' });
    await Cobro.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    await Cobro.belongsTo(Vehiculo, { foreignKey: 'vehiculo', as: "vehiculodata" });
    //await Cobro.sync({ force: true });

}
initializeDatabase()