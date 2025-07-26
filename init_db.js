const { sequelize } = require('./db');


const Estado = require('./model/Estado');
const Proyecto = require('./model/Proyecto')
const Pagoproyecto = require('./model/Pagoproyecto')
const Rol = require('./model/Rol')
const Usuario = require('./model/Usuario');
const Vehiculo = require('./model/Vehiculo');
const Valores = require('./model/Valores')
const Movimiento = require('./model/Movimientos')
const Parqueadero = require('./model/Parqueadero');
const Pago = require('./model/Pago')

async function initializeDatabase() {

    const synct = true;
    if (synct){
        //Estado

        const ExistEstado =  await Estado.findOne({limit:1});
        if (!ExistEstado){
        await Estado.sync({ force: true });
            await Estado.bulkCreate([

                { id_estado: 1, nombre_estado: 'Activo', categoria: 'General', id_categoria:1 },
                { id_estado: 2, nombre_estado: 'Bloqueado', categoria: 'General', id_categoria:1  },
                { id_estado: 3, nombre_estado: 'Inactivo', categoria: 'General', id_categoria:1  },
                { id_estado: 4, nombre_estado: 'Nuevo', categoria: 'General', id_categoria:1  },

                { id_estado: 5, nombre_estado: 'Anulado', categoria: 'Pagos', id_categoria:2 },
                { id_estado: 6, nombre_estado: 'Cobrado', categoria: 'Pagos', id_categoria:2  },
                { id_estado: 7, nombre_estado: 'Pagado', categoria: 'Pagos', id_categoria:2  },




                { id_estado: 8, nombre_estado: 'Cedula', categoria: 'documentos', id_categoria:3  },
                { id_estado: 9, nombre_estado: 'Cedula Extranjeria', categoria: 'documentos', id_categoria:3  },
                { id_estado: 10, nombre_estado: 'Pasaporte', categoria: 'documentos', id_categoria:3  },
                { id_estado: 11, nombre_estado: 'Registro Civil', categoria: 'documentos', id_categoria:4  },
                { id_estado: 12, nombre_estado: 'Tarjeta identidad', categoria: 'documentos', id_categoria:4  },




                { id_estado: 13, nombre_estado: 'Bicicleta', categoria: 'vehiculo', id_categoria:5  },
                { id_estado: 14, nombre_estado: 'Carro', categoria: 'vehiculo', id_categoria:5  },
                { id_estado: 15, nombre_estado: 'Moto', categoria: 'vehiculo', id_categoria:5  },


                { id_estado: 16, nombre_estado: 'Ingreso', categoria: 'movimiento', id_categoria:6  },
                { id_estado: 17, nombre_estado: 'Salida', categoria: 'movimiento', id_categoria:6 },

                { id_estado: 18, nombre_estado: 'Minuto', categoria: 'facturacion', id_categoria:7  },
                { id_estado: 19, nombre_estado: 'Hora', categoria: 'facturacion', id_categoria:7  },
                { id_estado: 20, nombre_estado: 'Dia', categoria: 'facturacion', id_categoria:7  },
                { id_estado: 21, nombre_estado: 'Semana', categoria: 'facturacion', id_categoria:7  },
                { id_estado: 22, nombre_estado: 'Mes', categoria: 'facturacion', id_categoria:7  },
                { id_estado: 23, nombre_estado: 'Año', categoria: 'facturacion', id_categoria:7  },

                { id_estado: 24, nombre_estado: 'Propietario', categoria: 'Tipousuario', id_categoria:8  },
                { id_estado: 25, nombre_estado: 'Visitante', categoria: 'Tipousuario', id_categoria:8  },

            ]);
        }

        //proyectos
        await Proyecto.sync({ force: true });
        await Proyecto.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        const  ExistProyecto =  await Proyecto.findOne({limit:1});
        if (!ExistProyecto){

            await Proyecto.create({
                nombre_proyecto: 'Proyecto 1 buenos aires',
                estado: 1,
                tiempogratuito:1,
                tiempoalertas:1,
                telefono:1,
                correo:"prueba@prueba.com"
            })
        }


        //Pagoproyecto
        const date = new Date()
        //preguntar por que la fecha no se guarda de hoy
        await Pagoproyecto.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Pagoproyecto.sync({ force: true });
        const  ExistProyectoPago =  await Pagoproyecto.findOne({limit:1});
        if (!ExistProyectoPago){

            await Pagoproyecto.create({
                estado: 1,
                pagoestado:1,
                id_proyecto:1,
                fecha_fin_licencia:date,
                fecha_inici_licencia:date
            })
        } 



        //Pagoproyecto
        //preguntar por que la fecha no se guarda de hoy
        await Rol.sync({ force: true });
        await Rol.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        const ExistRol =  await Rol.findOne({limit:1});
        if (!ExistRol){

            await Rol.bulkCreate([
                {id_rol:1, estado: 1, nombre: 'Administrador'},
                {id_rol:2, estado: 1, nombre: 'Operario'},
                {id_rol:3, estado: 1, nombre: 'superAdmin'},
            ]);
        } 


        await Usuario.sync({ force: true });
        await Usuario.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Usuario.belongsTo(Estado, { foreignKey: 'tipo_documento', as: 'TipoDocumento' });
        await Usuario.belongsTo(Rol, { foreignKey: 'id_rol', as: 'rol' });
        const  ExistUsuario =  await Usuario.findOne({limit:1});
        if (!ExistUsuario){
            await Usuario.bulkCreate([
                {id_usuario:1, nombres:"admin1", apellidos:"admin1", correo:"admin1@admin1.com", documento:"11111",password:"admin1",estado: 1,tipo_documento:8,id_proyecto:1,id_rol:3}
            ]);
        } 



        await Vehiculo.sync({ force: true });
        await Vehiculo.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Vehiculo.belongsTo(Estado, { foreignKey: 'tipovehiculo', as: 'TipoVehiculo' });
        await Vehiculo.belongsTo(Estado, { foreignKey: 'tipofacturacion', as: 'TipoFacturacion' });   
        await Vehiculo.belongsTo(Estado, { foreignKey: 'tipousuario', as: 'TipoUsuario' });           
        
        const  ExistVehiculo =  await Vehiculo.findOne({limit:1});
        if (!ExistVehiculo){
            await Vehiculo.bulkCreate([
                {id_vehiculo:1, placa:"aaa1111", tipovehiculo:13, tipofacturacion:23,estado:1,id_proyecto:1, parqueadero_asignado:"aaa111",tipousuario:24}
            ]);
        }





        await Valores.sync({ force: true });
        await Valores.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Valores.belongsTo(Estado, { foreignKey: 'tipovehiculo', as: 'TipoVehiculo' });
        await Valores.belongsTo(Estado, { foreignKey: 'tipofacturacion', as: 'TipoFacturacion' });        
        const  ExistValores =  await Valores.findOne({limit:1});
        if (!ExistValores){
            await Valores.bulkCreate([
                {valor:1, estado:1 , tipovehiculo:13, tipofacturacion:19,id_proyecto:1},
                {valor:1, estado:1 , tipovehiculo:13, tipofacturacion:22,id_proyecto:1},
                {valor:1, estado:1 , tipovehiculo:14, tipofacturacion:19,id_proyecto:1},
                {valor:1, estado:1 , tipovehiculo:14, tipofacturacion:22,id_proyecto:1},
                {valor:1, estado:1 , tipovehiculo:15, tipofacturacion:19,id_proyecto:1},
                {valor:1, estado:1 , tipovehiculo:15, tipofacturacion:22,id_proyecto:1}
            ]);
        }




        await Movimiento.sync({ force: true });
        await Movimiento.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Movimiento.belongsTo(Vehiculo, { foreignKey: 'id_vehiculo', as: 'IdVehiculo' });
        await Movimiento.belongsTo(Estado, { foreignKey: 'tipo_movimiento', as: 'TipoMovimiento' });        
        const  ExistMovimiento =  await Movimiento.findOne({limit:1});
        if (!ExistMovimiento){
            await Movimiento.bulkCreate([
                { estado:1 , id_vehiculo:13, tipo_movimiento:16, id_proyecto:1},
                { estado:1 , id_vehiculo:13, tipo_movimiento:17, id_proyecto:1},
            ]);
        }

    

        await Parqueadero.sync({ force: true });
        await Parqueadero.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Parqueadero.belongsTo(Estado, { foreignKey: 'tipovehiculo', as: 'TipoVehiculo' });        
        await Parqueadero.belongsTo(Estado, { foreignKey: 'tipoveparqueadero', as: 'TipoveParqueadero' });
        await Parqueadero.belongsTo(Estado, { foreignKey: 'tipousuario', as: 'TipoUsuario' });          
        

        const  ExistParqueadero =  await Parqueadero.findOne({limit:1});
        if (!ExistParqueadero){
            await Parqueadero.bulkCreate([
                { estado:1, tipovehiculo:13 , tipoveparqueadero:13, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:24},
            ]);
        }





        await Pago.sync({ force: true });
        await Pago.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Pago.belongsTo(Estado, { foreignKey: 'estado_pago', as: 'EstadoPago' });        
        await Pago.belongsTo(Estado, { foreignKey: 'tiporenta', as: 'TipoRenta' });
        await Pago.belongsTo(Movimiento, { foreignKey: 'id_movimiento_ngreso', as: 'MovimientoIgreso' });
        await Pago.belongsTo(Movimiento, { foreignKey: 'id_movimiento_salida', as: 'MovimientoSalida' });        
        await Pago.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'IdUsuario' }); 
        await Pago.belongsTo(Vehiculo, { foreignKey: 'id_vehiculo', as: 'IdVehiculo' });         
        
        
        const  ExistPago =  await Pago.findOne({limit:1});
        if (!ExistPago){
            await Pago.bulkCreate([
                { 
                    id_vehiculo:1, 
                    estado:1,
                    id_movimiento_ngreso:1,
                    id_movimiento_salida:1,
                    estado_pago:6,
                    tiporenta:23,
                    id_usuario:2,
                    id_proyecto:1,
                    Valor:1,
                    duracion_parqueo:1},
            ]);
        }

    }


}
initializeDatabase()