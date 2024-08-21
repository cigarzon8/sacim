var express = require('express');
var router = express.Router();
const Parqueadero = require('../model/Parqueadero');
const Estado = require('../model/Estado')

const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const parqueo = await Parqueadero.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['NombreEstado'],
    },
    {
        model: Estado,
        as: 'EstadoRelacion',
        attributes: ['NombreEstado'],
    }
  ]
  });

  const vehiculodata = parqueo.map(parq =>{
     const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.EstadoRelacion.NombreEstado;
    return vehiculoJson
  } );


  const values = ["#","Estado","Placa","Tipo Vehiculo","Usuario"]
  res.render('parqueadero/list', {datalist:vehiculodata,headerlist:values});
});


router.get('/add',auth, async function(req, res) {
    const Estados = await Estado.findAll({where:{seccion:'vehiculo'}})
    const estadoData = Estados.map(est => est.toJSON());
    res.render('parqueadero/add',{data:{},meesaje:{},estadoData});
});

router.post('/add',auth, async function(req, res) {
  req.body.estado = 1
  let meesaje = {
    estado:'success',
    text:'Usuario Creador correctamente'
  }


  for (let key in req.body) {
    if (req.body[key] === null) {
      meesaje.estado = 'danger',
      meesaje.text = 'Diligencie todos los campos'
      return res.render('parqueadero/add',{data:req.body,meesaje:meesaje});
    }
  }
  req.body.tipoveparqueadero = req.body.tipoveparqueadero.split(' - ')[1]
  const vehiculo = new Parqueadero(req.body);

  try {
    await vehiculo.save();
    res.render('parqueadero/add',{data:{},meesaje:meesaje});
  } catch (error) {
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'+error
    res.render('parqueadero/add',{data:req.body,meesaje:meesaje});
  }
});

router.get('/remove/:id',auth, async function(req, res) {
  const users = await Vehiculo.findOne({id:req.params.id});
  await users.destroy()
  res.redirect('/parqueadero');
});


module.exports = router;