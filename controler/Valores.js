var express = require('express');
var router = express.Router();
const Estado = require('../model/Estado')
const Valores = require('../model/Valores')
const auth = require('../midleware/auth')
const { Op } = require('sequelize');


router.get('/', auth,async function(req, res) {
  const moimientos = await Valores.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['NombreEstado'],
    }
  ],limit:10
  });

  const vehiculodata = moimientos.map(parq =>{
     const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.EstadoRelacion.NombreEstado;
    return vehiculoJson
  } );
  const values = ["#",,"Estado","$"]
  res.render('valores/list', {datalist:vehiculodata,headerlist:values});
});


router.get('/add',auth, async function(req, res) {
    res.redirect('/valores');
});

router.post('/add', auth, async function(req, res) {
  let meesaje = {
    estado: 'success',
    text: 'Usuario creado correctamente'
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
        { where: { id: parseInt(id) } }
      );
    }
    res.redirect('/valores');
  } catch (error) {
    res.redirect('/valores');
  }
});

module.exports = router;