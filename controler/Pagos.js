var express = require('express');
var router = express.Router();
const Pago = require('../model/Pago');
const Estado = require('../model/Estado')
const User = require('../model/Usuario');
const Proyecto = require('../model/Proyecto')
const Movimiento = require('../model/Movimientos')

const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const moimientos = await Pago.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['NombreEstado'],
    },
    {
      model: Estado,
      as: 'EstadoTiporenta',
      attributes: ['NombreEstado'],
    },{
      model: User,
      as: 'EstadoUsuario',
      attributes: ['nombres'],
    },
    {
      model: Proyecto,
      as:'EstadoProyecto',
      attributes: ['nombre'],
    },
    {
      model: Movimiento,
      as:'EstadoidIngreso',
      attributes: ['createdAt'],
    },
    {
      model: Movimiento,
      as:'EstadoidSalida',
      attributes: ['createdAt'],
    }
  ],limit:10
  });

  const vehiculodata = moimientos.map(parq =>{
    const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.EstadoRelacion.NombreEstado;
    vehiculoJson.usuario =parq.EstadoUsuario.nombres
    vehiculoJson.proyecto = parq.EstadoProyecto.nombre
    vehiculoJson.tiporenta = parq.EstadoTiporenta.NombreEstado
    vehiculoJson.idIngreso = new Date(parq.EstadoidIngreso.createdAt).toLocaleString();
    vehiculoJson.idSalida =  new Date(parq.EstadoidSalida.createdAt).toLocaleString();
    return vehiculoJson
  } );
  const values = ["#","Placa","Estado","Ingreso","Salida","Tipo Pago","Proyecto","Valor","Factura Electronica","Usuario"]
  res.render('pago/list', {datalist:vehiculodata,headerlist:values});
});




module.exports = router;