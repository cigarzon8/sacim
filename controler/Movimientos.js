var express = require('express');
var router = express.Router();
const Movimiento = require('../model/Movimientos');
const Estado = require('../model/Estado')
const Pagos = require('../model/Pago')
const Valores = require('../model/Valores')
const Vehiculo = require('../model/Vehiculo');
const auth = require('../midleware/auth')
const procesoArray = require('../utils/procesoArray')
const TipousUsuario = require('../model/Tipos_usuario')
const TipoFacturacion = require('../model/Tipos_facturacion')
const TipousVehiculo = require('../model/Tipos_vehiculo')
const TipoMovimiento = require('../model/Tipos_movimiento')
const formatoFecha = require('../utils/formatofecha')
const Parqueadero = require('../model/Parqueadero')

router.get('/', auth,async function(req, res) {
  const moimientos = await Movimiento.findAll({
    include: [{
      model: TipoMovimiento,
      as: 'TipoMovimiento',
      attributes: ['nombre_estado'],
    },{
      model: Vehiculo,
      as: 'IdVehiculo',
      attributes: ['placa'],
    },
  ],limit:10,
  order: [['createdAt', 'DESC']],
  });

  const vehiculodata = moimientos.map(parq =>{
    const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.TipoMovimiento.nombre_estado;
    vehiculoJson.placa = parq.IdVehiculo.placa
    vehiculoJson.createdAt = formatoFecha(vehiculoJson.createdAt)
    return vehiculoJson
  } );
  const values = ["#","Placa","Tipo Movimiento","Fecha Movimiento"]
  res.render('movimiento/list', {datalist:vehiculodata,headerlist:values});
});

router.get('/add',auth, async function(req, res) {
  const TiposdeVehiculos = await TipousVehiculo.findAll();
  const tiposdevehiculolist = await procesoArray(TiposdeVehiculos)
  res.render('movimiento/add',{data:{tiposdevehiculolist},meesaje:{}});
});

router.post('/add',auth, async function(req, res) {
   req.body.id_proyecto = 1 
   req.body.estado = 1 
  const placa = req.body.placa
  const filstro = 
  {
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    },
    {
      model: TipousVehiculo,
      as: 'TipoVehiculo',
      attributes: ['nombre_estado'],
    },
    {
      model: TipoFacturacion,
      as: 'TipoFacturacion',
      attributes: ['nombre_estado'],
    },
    {
      model: TipousUsuario,
      as: 'TipoUsuario',
      attributes: ['nombre_estado'],
    }
  ]
  }
  if (placa) filstro.where = {placa}

  let vehiculo = await Vehiculo.findOne(filstro);



  if(req.body.tipo_movimiento  == 'Ingresar'){
    req.body.tipo_movimiento = 1;
  }
  if(req.body.tipo_movimiento  == 'Salida'){
    req.body.tipo_movimiento = 2;
  }



  if (vehiculo){
    req.body.id_vehiculo = vehiculo.dataValues.id_vehiculo
  }else{
    vehiculo = {
      placa,
      tipovehiculo:req.body.tipovehiculo,
      tipofacturacion:2,
      estado:1,
      id_proyecto:1,
      parqueadero_asignado:null,
      tipousuario:2}
      VehiculoNuevo = new Vehiculo(vehiculo)
      vehiculo = await VehiculoNuevo.save();
      req.body.id_vehiculo = vehiculo.dataValues.id_vehiculo
    }
    MovimientoNuevo = new Movimiento(req.body)
    const movimientoNuevo2 = await MovimientoNuevo.save();
    const movimientoNuevo2_id = movimientoNuevo2.dataValues.id_movimiento
    if (req.body.tipo_movimiento == 1 ){
        if (vehiculo?.tipousuario == 2){
        const pagosobject = {
          id_vehiculo:req.body.id_vehiculo, 
          estado:1,
          id_movimiento_ngreso:movimientoNuevo2_id,
          id_movimiento_salida:movimientoNuevo2_id,
          estado_pago:1,
          tiporenta: vehiculo.dataValues.tipofacturacion,
          id_usuario:1,
          id_proyecto:1,
          Valor:0,
          duracion_parqueo:0
        }

        await new Pagos(pagosobject).save();
      }

    }else{
      if (vehiculo?.tipousuario == 2){
        //fin id and id vehicule con estado 
        //i id movimiento ovial
        const filstro = {}
        filstro.where = {estado_pago:1,id_vehiculo:vehiculo.id_vehiculo}
        const Existe_Pago = await Pagos.findOne(filstro)

        const filterValue = {where:{tipofacturacion:Existe_Pago.tiporenta,tipovehiculo:vehiculo.tipovehiculo}}
        const ValorRenta = await Valores.findOne(filterValue) 
        let Valor = ValorRenta?.valor*diferenciaEnMinutos(Existe_Pago.createdAt)
        Existe_Pago.set({
          Valor,
          estado:3,
          estado_pago:3,
          id_movimiento_salida:movimientoNuevo2_id,
        });
        Existe_Pago.save();
      }
    }

  let parqueaderofiltro = 
  {
    estado:1,
    tipovehiculo:req.body.tipovehiculo,
    tipousuario: vehiculo.tipousuario,
    id_proyecto:1}
  let ParqueaderoMatch = await Parqueadero.findOne(parqueaderofiltro);


    const TiposdeVehiculos = await TipousVehiculo.findAll();
    const tiposdevehiculolist = await procesoArray(TiposdeVehiculos)
    let meesaje = {
     estado:'success',
     text:'Movimiento registrados correctaente'
    }

    if(ParqueaderoMatch.capacidad <= 0){
      meesaje = {
        estado:'danger',
        text:'No hay Capacidad en el parqueadero'
      } 
    }else{
      if(req.body.tipo_movimiento == 1){
          ParqueaderoMatch.set({
            ocupacion:ParqueaderoMatch.ocupacion+1
          });
      }
      if(req.body.tipo_movimiento == 2){
            ParqueaderoMatch.set({
            ocupacion:ParqueaderoMatch.ocupacion-1
          });
      }
      ParqueaderoMatch.save();
    }
    return res.render('movimiento/add',{data:{tiposdevehiculolist},meesaje});

});
function diferenciaEnMinutos(fechaCreacion) {
  const fecha1 = new Date(fechaCreacion);
  const fecha2 = new Date(); // hora actual
  const diffMs = fecha2 - fecha1;
  let diffMin = Math.floor(diffMs / (1000 * 60));
  if (!diffMin) diffMin = 1 
  return diffMin;
}


async function find(placa) {
  return await Pagos.findOne({
    include: [{
      model: Valores,
      as: 'EstadoValor',
      attributes: ['valor']
    }],
    where: {
      placa: placa,
      estado:1,
      pagoEstado:7,
      usuario:1,
      proyecto:1,
      Valor:0
    },
    limit:1
  });
}

module.exports = router;