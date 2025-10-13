var express = require('express');
var router = express.Router();
const { createObjectCsvStringifier } = require('csv-writer');


const Parqueadero = require('../model/Parqueadero');
const TipoParqueadero = require('../model/Tipos_parqueadero')
const Estado = require('../model/Estado')
const Movimiento = require('../model/Movimientos');
const Pagos = require('../model/Pago')
const Valores = require('../model/Valores')
const Vehiculo = require('../model/Vehiculo');
const TipousVehiculo = require('../model/Tipos_vehiculo')
const TipousUsuario = require('../model/Tipos_usuario')
const procesoArray = require('../utils/procesoArray')
const auth = require('../midleware/auth')
const TipoFacturacion = require('../model/Tipos_facturacion')
const TipoMovimiento = require('../model/Tipos_movimiento')
const formatoFecha = require('../utils/formatofecha')

router.get('/', auth,async function(req, res) {
  res.render('informes/list', {});
});

router.get('/backup', async function (req, res) {
  try {
  const parqueaderos = await Movimiento.findAll({
    order: [['createdAt', 'DESC']],
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    },{
      model: Vehiculo,
      as: 'IdVehiculo',
      attributes: ['placa'],
    },
  ],  raw: true,
      nest: true,
  });
    // Definir cabeceras del CSV
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'id', title: 'ID' },
        { id: 'Estado', title: 'Movimiento' },
        { id: 'Placa', title: 'Placa' },
        { id: 'hora', title: 'Hora de acción' },
      ],
    });

    // Mapeamos los datos
    const data = parqueaderos.map((p) => (
     {
       id: p.id_movimiento,
      Estado: p.EstadoRelacion?.nombre_estado || '',
      Placa: p.IdVehiculo?.placa || '',
      hora: p.createdAt || '',
    }));
    // Generar CSV con cabeceras + registros
    const csv =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('informe_parqueaderos.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando CSV' });
  }
});

router.get('/estadoplaca', auth,async function(req, res) {
  let placa = req.query.placa
  let vehiculodata ={}
  let id_vehiculo = null
  const filstro = 
  {
    order: [['createdAt', 'DESC']],
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
  if (placa){
    filstro.where = {placa}
      vehiculodata = await Vehiculo.findOne(filstro);
      if(vehiculodata?.dataValues){
        id_vehiculo = vehiculodata.dataValues.id_vehiculo
        vehiculodata.dataValues.estado = vehiculodata.dataValues.EstadoRelacion.nombre_estado;
        vehiculodata.dataValues.tipovehiculo = vehiculodata.dataValues.TipoVehiculo.nombre_estado;
        vehiculodata.dataValues.idtipovehiculo = vehiculodata.dataValues.TipoVehiculo
        vehiculodata.dataValues.createdAt = formatoFecha(vehiculodata.dataValues.createdAt)
        
        vehiculodata = vehiculodata.toJSON();
      }
  }
  
  const moimientos = await Movimiento.findAll({
    include: [{
      model: TipoMovimiento,
      as: 'TipoMovimiento',
      attributes: ['nombre_estado'],
    }
  ],limit:4,where:{id_vehiculo}
  });
  const Movimientodata = moimientos.map(parq =>{
    const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.TipoMovimiento.nombre_estado;
    vehiculoJson.createdAt = formatoFecha(vehiculoJson.createdAt)
    return vehiculoJson
  } );

  var data = {placa,Movimientodata,vehiculodata}
  const values = ["hora","Tipo"]
  res.render('informes/estadovehiculo', {data,headerlist:values});
});


module.exports = router;