
var express = require('express');
var router = express.Router();
const Vehiculo = require('../model/Vehiculo');
const User = require('../model/User');
const Estado = require('../model/Estado')
const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const vehiculo = await Vehiculo.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['NombreEstado'],
    },
    {
      model: Estado,
      as: 'TipoVehiculoRelacion',
      attributes: ['NombreEstado'],
    }
  ]
  });
  const vehiculodata = vehiculo.map(vehi =>{
     const vehiculoJson = vehi.toJSON();
    vehiculoJson.estado = vehi.EstadoRelacion.NombreEstado;
    vehiculoJson.tipovehiculo = vehi.TipoVehiculoRelacion.NombreEstado;
    vehiculoJson.idtipovehiculo = vehi.tipovehiculo
    return vehiculoJson
  } );
  const users = await User.findAll();

  const values = ["#","Estado","Placa","Tipo Vehiculo","Usuario"]
  res.render('vehiculo/list', {datalist:vehiculodata,headerlist:values,users});
});


router.get('/add',auth, async function(req, res) {
    const users = await User.findAll();
    const userdata = users.map(vehi => vehi.toJSON());
    const Estados = await Estado.findAll({where:{seccion:'vehiculo'}})
    const estadoData = Estados.map(est => est.toJSON());
    res.render('vehiculo/add',{data:{},meesaje:{},userdata,estadoData});
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
      return res.render('vehiculo/add',{data:req.body,meesaje:meesaje});
    }
  }
  req.body.idusuario = req.body.idusuario.split(' - ')[1]
  req.body.tipovehiculo = req.body.tipovehiculo.split(' - ')[1]
  const vehiculo = new Vehiculo(req.body);

  try {
    await vehiculo.save();
    res.render('vehiculo/add',{data:{},meesaje:meesaje});
  } catch (error) {
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'+error
    res.render('vehiculo/add',{data:req.body,meesaje:meesaje});
  }
});

router.get('/remove/:id',auth, async function(req, res) {
  const users = await Vehiculo.findOne({id:req.params.id});
  await users.destroy()
  res.redirect('/vehiculo');
});


module.exports = router;