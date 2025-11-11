const { sequelize } = require('./db');


const Estado = require('./model/Estado');
const Proyecto = require('./model/Proyecto')
const Proyectopago = require('./model/Proyectopago')
const Rol = require('./model/Rol')
const Usuario = require('./model/Usuario')//
const Vehiculo = require('./model/Vehiculo');
const Valores = require('./model/Valores')
const Movimiento = require('./model/Movimientos')
const Parqueadero = require('./model/Parqueadero');
const Pago = require('./model/Pago')

const TipoPagos = require('./model/Tipos_pagos')
const TipoDocumentos = require('./model/Tipos_documentos')
const TipousUsuario = require('./model/Tipos_usuario')
const TipoMovimiento = require('./model/Tipos_movimiento')
const TipoFacturacion = require('./model/Tipos_facturacion')
const TipoParqueadero = require('./model/Tipos_parqueadero')
const TipoRenta = require('./model/Tipos_renta')
const TipousVehiculo = require('./model/Tipos_vehiculo')

async function initializeDatabase() {

    const synct = true;
    if (synct){
        //Estado


        await Estado.sync({ force: true });
        const ExistEstado =  await Estado.findOne({limit:1});
        if (!ExistEstado){

            await Estado.bulkCreate([

                    { id_estado: 1, nombre_estado: 'Activo' },
                    { id_estado: 2, nombre_estado: 'Bloqueado'},
                    { id_estado: 3, nombre_estado: 'Inactivo'},
                    { id_estado: 4, nombre_estado: 'Nuevo'},

            ]);

        }

        
        await TipoPagos.sync({ force: true });
        const ExistTipoPagos =  await TipoPagos.findOne({limit:1});
        if (!ExistTipoPagos){

            await TipoPagos.bulkCreate([
    
                { id_tipo_pagos: 1, nombre_estado: 'Anulado'},
                { id_tipo_pagos: 2, nombre_estado: 'Cobrado' },
                { id_tipo_pagos: 3, nombre_estado: 'Pagado' },
    
            ]);
        }


        await TipoDocumentos.sync({ force: true });
        const ExistTipoDocumentos =  await TipoDocumentos.findOne({limit:1});
        if (!ExistTipoDocumentos){

            await TipoDocumentos.bulkCreate([
                { id_tipo_documento: 1, nombre_estado: 'Cedula'},
                { id_tipo_documento: 2, nombre_estado: 'Cedula Extranjeria'},
                { id_tipo_documento: 3, nombre_estado: 'Pasaporte'},
                { id_tipo_documento: 4, nombre_estado: 'Registro Civil'},
                { id_tipo_documento: 5, nombre_estado: 'Tarjeta identidad'},
            ]);
        }

        await TipousUsuario.sync({ force: true });
        const ExistTipousUsuario =  await TipousUsuario.findOne({limit:1});
        if (!ExistTipousUsuario){
            await TipousUsuario.bulkCreate([
                { id_tipo_usuario: 1, nombre_estado: 'Propietario'},
                { id_tipo_usuario: 2, nombre_estado: 'Visitante'},
            ]);
        }
        await TipoMovimiento.sync({ force: true });
        const ExistTipoMovimiento =  await TipoMovimiento.findOne({limit:1});
        if (!ExistTipoMovimiento){
            await TipoMovimiento.bulkCreate([
                { id_tipo_movimiento: 1, nombre_estado: 'Ingreso'},
                { id_tipo_movimiento: 2, nombre_estado: 'Salida'},
            ]);
        }


        await TipoFacturacion.sync({ force: true });
        const ExistTipoFacturacion =  await TipoFacturacion.findOne({limit:1});
        if (!ExistTipoFacturacion){
            await TipoFacturacion.bulkCreate([
                { id_tipo_facturacion: 1, nombre_estado: 'Minuto'},
                { id_tipo_facturacion: 2, nombre_estado: 'Hora'},
                { id_tipo_facturacion: 3, nombre_estado: 'Dia'},
                { id_tipo_facturacion: 4, nombre_estado: 'Semana'},
                { id_tipo_facturacion: 5, nombre_estado: 'Mes'},
                { id_tipo_facturacion: 6, nombre_estado: 'Año'},

            ]);
        }

        await TipoParqueadero.sync({ force: true });
        const ExistTipoParqueadero =  await TipoParqueadero.findOne({limit:1});
        if (!ExistTipoParqueadero){
            await TipoParqueadero.bulkCreate([

                { id_tipo_parqueadero: 1, nombre_estado: 'Propietario'},
                { id_tipo_parqueadero: 2, nombre_estado: 'Visitante'},

            ]);
        }

        await TipousVehiculo.sync({ force: true });
        const ExistTipousVehiculo =  await TipousVehiculo.findOne({limit:1});
        if (!ExistTipousVehiculo){
            await TipousVehiculo.bulkCreate([

                { id_tipo_vehiculo: 1, nombre_estado: 'Bicicleta'},
                { id_tipo_vehiculo: 2, nombre_estado: 'Carro'},
                { id_tipo_vehiculo: 3, nombre_estado: 'Motocicleta'},

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


        //Proyectopago
        const date = new Date()
        //preguntar por que la fecha no se guarda de hoy
        await Proyectopago.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Proyectopago.belongsTo(TipoPagos, { foreignKey: 'pagoestado', as: 'PagoEstado' });
        //await Proyectopago.belongsTo(Proyecto, { foreignKey: 'id_proyecto', as: 'IdProyecto' });
        await Proyectopago.sync({ force: true });
        const  ExistProyectoPago =  await Proyectopago.findOne({limit:1});
        if (!ExistProyectoPago){

            await Proyectopago.create({
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
        await Usuario.belongsTo(TipoDocumentos, { foreignKey: 'tipo_documento', as: 'TipoDocumento' });
        await Usuario.belongsTo(Rol, { foreignKey: 'id_rol', as: 'rol' });
        const  ExistUsuario =  await Usuario.findOne({limit:1});
        if (!ExistUsuario){
            await Usuario.bulkCreate([
                {id_usuario:1, nombres:"admin1", apellidos:"admin1", correo:"admin1@admin1.com", documento:"11111",password:"admin1",estado: 1,tipo_documento:1,id_proyecto:1,id_rol:3}
            ]);
        } 



        await Vehiculo.sync({ force: true });
        await Vehiculo.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Vehiculo.belongsTo(TipousVehiculo, { foreignKey: 'tipovehiculo', as: 'TipoVehiculo' });
        await Vehiculo.belongsTo(TipoFacturacion, { foreignKey: 'tipofacturacion', as: 'TipoFacturacion' });   
        await Vehiculo.belongsTo(TipousUsuario, { foreignKey: 'tipousuario', as: 'TipoUsuario' });           
        
        const  ExistVehiculo =  await Vehiculo.findOne({limit:1});
        if (!ExistVehiculo){
            await Vehiculo.bulkCreate([
                {id_vehiculo:1, placa:"aaa1111", tipovehiculo:1, tipofacturacion:2,estado:1,id_proyecto:1, parqueadero_asignado:"aaa111",tipousuario:1}
            ]);
        }





        await Valores.sync({ force: true });
        await Valores.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Valores.belongsTo(TipousVehiculo, { foreignKey: 'tipovehiculo', as: 'TipoVehiculo' });
        await Valores.belongsTo(TipoFacturacion, { foreignKey: 'tipofacturacion', as: 'TipoFacturacion' });        
        const  ExistValores =  await Valores.findOne({limit:1});
        if (!ExistValores){
            await Valores.bulkCreate([
                //Biciclenta
                {valor:13100, estado:1 , tipovehiculo:1, tipofacturacion:1,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:1, tipofacturacion:2,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:1, tipofacturacion:3,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:1, tipofacturacion:4,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:1, tipofacturacion:5,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:1, tipofacturacion:6,id_proyecto:1},
                //Carro
                {valor:13100, estado:1 , tipovehiculo:2, tipofacturacion:1,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:2, tipofacturacion:2,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:2, tipofacturacion:3,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:2, tipofacturacion:4,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:2, tipofacturacion:5,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:2, tipofacturacion:6,id_proyecto:1},
                //Carro
                {valor:13100, estado:1 , tipovehiculo:3, tipofacturacion:1,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:3, tipofacturacion:2,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:3, tipofacturacion:3,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:3, tipofacturacion:4,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:3, tipofacturacion:5,id_proyecto:1},
                {valor:13100, estado:1 , tipovehiculo:3, tipofacturacion:6,id_proyecto:1},
            ]);
        }




        await Movimiento.sync({ force: true });
        await Movimiento.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Movimiento.belongsTo(Vehiculo, { foreignKey: 'id_vehiculo', as: 'IdVehiculo' });
        await Movimiento.belongsTo(TipoMovimiento, { foreignKey: 'tipo_movimiento', as: 'TipoMovimiento' });        
        const  ExistMovimiento =  await Movimiento.findOne({limit:1});
        if (!ExistMovimiento){
            await Movimiento.bulkCreate([
                { estado:1 , id_vehiculo:1, tipo_movimiento:1, id_proyecto:1},
                { estado:1 , id_vehiculo:1, tipo_movimiento:2, id_proyecto:1},
            ]);
        }

    

        await Parqueadero.sync({ force: true });
        await Parqueadero.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Parqueadero.belongsTo(TipousVehiculo, { foreignKey: 'tipovehiculo', as: 'TipoVehiculo' });        
        await Parqueadero.belongsTo(TipousUsuario, { foreignKey: 'tipousuario', as: 'TipoUsuario' });          
        

        const  ExistParqueadero =  await Parqueadero.findOne({limit:1});
        if (!ExistParqueadero){
            await Parqueadero.bulkCreate([
                { estado:1, tipovehiculo:1 , tipoveparqueadero:1, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:1},
                { estado:1, tipovehiculo:1 , tipoveparqueadero:2, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:1},
                { estado:1, tipovehiculo:2 , tipoveparqueadero:1, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:1},
                { estado:1, tipovehiculo:2 , tipoveparqueadero:2, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:1},
                { estado:1, tipovehiculo:3 , tipoveparqueadero:1, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:1},
                { estado:1, tipovehiculo:3 , tipoveparqueadero:2, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:1},


                { estado:1, tipovehiculo:1 , tipoveparqueadero:1, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:2},
                { estado:1, tipovehiculo:1 , tipoveparqueadero:2, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:2},
                { estado:1, tipovehiculo:2 , tipoveparqueadero:1, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:2},
                { estado:1, tipovehiculo:2 , tipoveparqueadero:2, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:2},
                { estado:1, tipovehiculo:3 , tipoveparqueadero:1, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:2},
                { estado:1, tipovehiculo:3 , tipoveparqueadero:2, id_proyecto:1,capacidad:10,ocupacion:0,tipousuario:2},
            ]);
        }





        await Pago.sync({ force: true });
        await Pago.belongsTo(Estado, { foreignKey: 'estado', as: 'EstadoRelacion' });
        await Pago.belongsTo(TipoPagos, { foreignKey: 'estado_pago', as: 'EstadoPago' });        
        await Pago.belongsTo(TipoFacturacion, { foreignKey: 'tiporenta', as: 'TipoRenta' });
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
                    estado_pago:1,
                    tiporenta:1,
                    id_usuario:1,
                    id_proyecto:1,
                    Valor:1,
                    duracion_parqueo:1},
            ]);
        }

    }


}
initializeDatabase()