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
  ],limit:10
  });

  const vehiculodata = moimientos.map(parq =>{
    const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.TipoMovimiento.nombre_estado;
    vehiculoJson.placa = parq.IdVehiculo.placa
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
  console.log('req.body',req.body)
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

    const pagosobject = {
      id_vehiculo:req.body.id_vehiculo, 
      estado:1,
      id_movimiento_ngreso:movimientoNuevo2.dataValues.id_movimiento,
      id_movimiento_salida:movimientoNuevo2.dataValues.id_movimiento,
      estado_pago:1,
      tiporenta: vehiculo.dataValues.tipofacturacion,
      id_usuario:1,
      id_proyecto:1,
      Valor:0,
      duracion_parqueo:0
    }
    const pago = await new Pagos(pagosobject).save();
    const TiposdeVehiculos = await TipousVehiculo.findAll();
    const tiposdevehiculolist = await procesoArray(TiposdeVehiculos)
    let meesaje = {
     estado:'success',
     text:'Movimiento registrados correctaente'
    }
    return res.render('movimiento/add',{data:{tiposdevehiculolist},meesaje});

});
async function savepago(idingreso,idsalida=0) {
  const pagonuevo ={
    placa:idingreso.placa,
    tiporenta:1,
    estado:1,
    idIngreso:idingreso.id,
    idSalida:idingreso.id,
    pagoEstado:7,
    usuario:1,
    proyecto:1,
    Valor:0,
    facturaElectronica:false

  }
  const pago = new Pagos(pagonuevo).save();
}

async function exitSavePago(idingreso) {
  const pagos = await find(idingreso.placa);
  if (pagos){
  const createdAt = new Date(pagos.dataValues.createdAt);
  const ahora = new Date();
  const minutosPasados = Math.floor((ahora - createdAt) / 1000 / 60)*pagos?.EstadoValor?.valor;
  pagos.Valor = minutosPasados;
  await pagos.save();
  }

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