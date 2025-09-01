var express = require('express');
var router = express.Router();
const Estado = require('../model/Estado')
const Valores = require('../model/Valores')
const TipoFacturacion = require('../model/Tipos_facturacion')
const TipousVehiculo = require('../model/Tipos_vehiculo')
const auth = require('../midleware/auth')
const { Op } = require('sequelize');


router.get('/', auth,async function(req, res) {
  const moimientos = await Valores.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    },{
      model: TipoFacturacion,
      as: 'TipoFacturacion',
      attributes: ['nombre_estado'],
    },{
      model: TipousVehiculo,
      as: 'TipoVehiculo',
      attributes: ['nombre_estado'],
    }
  ]
  });

  const vehiculodata = moimientos.map(parq =>{
     const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.EstadoRelacion.nombre_estado;
    vehiculoJson.TipoFacturacion = parq.TipoFacturacion.nombre_estado;
    vehiculoJson.TipoVehiculo = parq.TipoVehiculo.nombre_estado;
    return vehiculoJson
  } );
  const values = ["#",,"Estado","Tipo Vehiculo","Tipo Facturacion","$"]
  res.render('valores/list', {datalist:vehiculodata,headerlist:values});
});


router.get('/add',auth, async function(req, res) {
    res.redirect('/valores');
});

router.post('/add', auth, async function(req, res) {
  let meesaje = {
    estado: 'success',
    text: 'Valores actualizados correctamente'
  };

  for (let key in req.body) {
    if (req.body[key] === null || req.body[key] === '') {
      meesaje.estado = 'danger';
      meesaje.text = 'Diligencie todos los campos';
      return res.render('valores', { data: req.body, meesaje });
    }
  }

  const ids = Object.keys(req.body)
    .filter(key => key !== 'estado');

  try {
    for (const id of ids) {
      const nuevoValor = req.body[id];
      await Valores.update(
        { valor: nuevoValor },     // campo a actualizar
        { where: { id_valor: parseInt(id) } }
      );
    }
    res.redirect('/valores');
  } catch (error) {
    console.log('error',error)
    res.redirect('/valores');
  }
});

module.exports = router;