const { sequelize } = require('./db');


const Estado = require('./model/Estado');
const Vehiculo = require('./model/Vehiculo');
const User = require('./model/User');
const Parqueadero = require('./model/Parqueadero');
const Cobro = require('./model/Cobros')
const Proyecto = require('./model/Proyecto')
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


    await Proyecto.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    /*await Proyecto.sync({ force: true });
    await Proyecto.create({
        nombre: 'Proyecto 1 buenos aires',
        estado: 1,
    })*/

    await User.belongsTo(Estado, { foreignKey: 'estado' });
    await User.belongsTo(Proyecto, { foreignKey: 'proyecto' });
    await User.sync({ force: true })
    //await User.hasMany(Vehiculo, { foreignKey: 'id' });
    /*;
    await User.create({
    nombres: 'Juan',
    apellidos: 'Pérez',
    correo: '123456@123456.com',
    documento: 123456,
    password: 123456,
    estado: 1,
    });*/
    
    await Parqueadero.belongsTo(Estado, { foreignKey:'tipoveparqueadero', as: 'EstadoparqueaderoRelacion' });
    await Parqueadero.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    //await Parqueadero.sync({ force: true });

    await Cobro.belongsTo(Estado, { foreignKey: 'tipoveparqueadero', as: 'TipoParqueaderoRelacion' });
    await Cobro.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    await Cobro.belongsTo(Vehiculo, { foreignKey: 'vehiculo', as: "vehiculodata" });
    //await Cobro.sync({ force: true });

}
initializeDatabase()