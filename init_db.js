const { sequelize } = require('./db');


const Estado = require('./model/Estado');
const Vehiculo = require('./model/Vehiculo');
const User = require('./model/User');
const Parqueadero = require('./model/Parqueadero');
const Cobro = require('./model/Cobros')
const Proyecto = require('./model/Proyecto')
const Movimiento = require('./model/Movimientos')
const Pago = require('./model/Pago')
const Valores = require('./model/Valores')

async function initializeDatabase() {
    //await Estado.sync({ force: true });
    /*await Estado.bulkCreate([
        { id: 1, NombreEstado: 'Activo', seccion: 'General' },
        { id: 2, NombreEstado: 'Inactivo', seccion: 'General' },
        { id: 3, NombreEstado: 'Pendiente', seccion: 'Administrativo' },
        { id: 4, NombreEstado: 'Carro', seccion: 'vehiculo' },
        { id: 5, NombreEstado: 'Moto', seccion: 'vehiculo' },
        { id: 6, NombreEstado: 'Camioneta', seccion: 'vehiculo' },
        { id: 7, NombreEstado: 'Ingreso', seccion: 'cobro' },
        { id: 8, NombreEstado: 'Salida', seccion: 'cobro' },
        { id: 9, NombreEstado: 'Pagado', seccion: 'cobro' },
        { id: 10, NombreEstado: 'Pango Hora', seccion: 'pagos' },
        { id: 11, NombreEstado: 'Pango Dia', seccion: 'pagos' },
        { id: 12, NombreEstado: 'Pango Semana', seccion: 'pagos' },
        { id: 13, NombreEstado: 'Pango Mes', seccion: 'pagos' },
    ]);*/
    //await Movimiento.sync({ force: true });
    await Movimiento.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });


    //await Valores.sync({ force: true });
    await Valores.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });    
    /*await Valores.bulkCreate([
        { valor: 1, estado: 10},
        { valor: 1, estado: 11},
        { valor: 1, estado: 12},
        { valor: 1, estado: 13},
    ]);*/


    await Vehiculo.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    await Vehiculo.belongsTo(Estado, { foreignKey: 'tipovehiculo', as: 'TipoVehiculoRelacion' });
    
    //await Vehiculo.sync({ force: true });


    await Proyecto.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    //await Proyecto.sync({ force: true });
    /*await Proyecto.create({
        nombre: 'Proyecto 1 buenos aires',
        estado: 1,
    })*/

    await User.belongsTo(Estado, { foreignKey: 'estado' });
    await User.belongsTo(Proyecto, { foreignKey: 'proyecto' });
    //await User.sync({ force: true })
    //await User.hasMany(Vehiculo, { foreignKey: 'id' });;
    /*await User.create({
    nombres: 'Juan',
    apellidos: 'Pérez',
    correo: '123456@123456.com',
    documento: 123456,
    password: 123456,
    proyecto: 1,
    estado: 1,
    });*/
    
    await Parqueadero.belongsTo(Estado, { foreignKey:'tipoveparqueadero', as: 'EstadoparqueaderoRelacion' });
    await Parqueadero.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    //await Parqueadero.sync({ force: true });

    await Cobro.belongsTo(Estado, { foreignKey: 'tipoveparqueadero', as: 'TipoParqueaderoRelacion' });
    await Cobro.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    await Cobro.belongsTo(Vehiculo, { foreignKey: 'vehiculo', as: "vehiculodata" });
    //await Cobro.sync({ force: true });


    
    await Pago.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
    //await Pago.belongsTo(Estado, { foreignKey: 'tiporenta', as: 'EstadoTiporenta' });
    await Pago.belongsTo(Movimiento, { foreignKey: 'idIngreso', as: 'EstadoidIngreso' });
    await Pago.belongsTo(Movimiento, { foreignKey: 'idSalida', as: 'EstadoidSalida' });    
    await Pago.belongsTo(User, { foreignKey: 'usuario', as: 'EstadoUsuario' });    
    await Pago.belongsTo(Proyecto, { foreignKey: 'proyecto', as: 'EstadoProyecto'  });    
    await Pago.belongsTo(Valores, { foreignKey: 'tiporenta',as: 'EstadoValor' });
    //await Pago.sync({ force: true });

}
initializeDatabase()