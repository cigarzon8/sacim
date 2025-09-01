var express = require('express');
var router = express.Router();
const Pago = require('../model/Pago');
const Estado = require('../model/Estado')
const User = require('../model/Usuario');
const Movimiento = require('../model/Movimientos')
const Vehiculo = require('../model/Vehiculo')
const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const moimientos = await Pago.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    },
    /*{
      model: Estado,
      as: 'EstadoTiporenta',
      attributes: ['nombre_estado'],
    },*/{
      model: User,
      as: 'IdUsuario',
      attributes: ['nombres'],
    },
    /*{
      model: Proyecto,
      as:'EstadoProyecto',
      attributes: ['nombre'],
    },*/
    {
      model: Movimiento,
      as:'MovimientoIgreso',
      attributes: ['createdAt'],
    },
    {
      model: Movimiento,
      as:'MovimientoSalida',
      attributes: ['createdAt'],
    },{
      model: Vehiculo,
      as:'IdVehiculo',
      attributes: ['placa'],
       
    }
  ],limit:10
  });

  const vehiculodata = moimientos.map(parq =>{
    const vehiculoJson = parq.toJSON();
    console.log('vehiculoJson',vehiculoJson)
    vehiculoJson.estado = parq.EstadoRelacion.nombre_estado;
    vehiculoJson.usuario = parq.IdUsuario.nombres
    vehiculoJson.placa = parq.IdVehiculo.placa
    
    //vehiculoJson.proyecto = parq.EstadoProyecto.nombre
    //vehiculoJson.tiporenta = parq.EstadoTiporenta.NombreEstado
    vehiculoJson.idIngreso = new Date(parq.MovimientoIgreso.createdAt).toLocaleString();
    vehiculoJson.idSalida =  new Date(parq.MovimientoSalida.createdAt).toLocaleString();
    return vehiculoJson
  } );
  const values = ["#","Placa","Estado","Ingreso","Salida","Tipo Pago","Valor"]
  res.render('pago/list', {datalist:vehiculodata,headerlist:values});
});




module.exports = router;