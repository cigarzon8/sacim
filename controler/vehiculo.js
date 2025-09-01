
var express = require('express');
var router = express.Router();
const Vehiculo = require('../model/Vehiculo');
const User = require('../model/Usuario');
const Estado = require('../model/Estado')
const auth = require('../midleware/auth')

const TipousUsuario = require('../model/Tipos_usuario')
const TipoFacturacion = require('../model/Tipos_facturacion')
const TipousVehiculo = require('../model/Tipos_vehiculo')

const procesoArray = require('../utils/procesoArray')

router.get('/', auth,async function(req, res) {
  const placa = req.query.placa
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

  const vehiculo = await Vehiculo.findAll(filstro);
  const vehiculodata = vehiculo.map(vehi =>{
     const vehiculoJson = vehi.toJSON();
    vehiculoJson.estado = vehi.EstadoRelacion.nombre_estado;
    vehiculoJson.tipovehiculo = vehi.TipoVehiculo.nombre_estado;
    vehiculoJson.idtipovehiculo = vehi.tipovehiculo
    return vehiculoJson
  } );
  const users = await User.findAll();

  const values = ["#","Estado","Placa","Tipo Vehiculo","Usuario"]
  res.render('vehiculo/list', {datalist:vehiculodata,headerlist:values,users});
});


router.get('/add',auth, async function(req, res) {

  const [
    tiposEstado,
    tiposVehiculo,
    tiposFacturacion,
    tiposUsuario
  ] = await Promise.all([
    Estado.findAll().then(procesoArray),
    TipousVehiculo.findAll().then(procesoArray),
    TipoFacturacion.findAll().then(procesoArray),
    TipousUsuario.findAll().then(procesoArray),
  ]);

   const users = procesoArray(await User.findAll());  

   res.render('vehiculo/add',{data:{},meesaje:{},tiposEstado,tiposVehiculo,tiposFacturacion,tiposUsuario,users});
});

router.post('/add',auth, async function(req, res) {
  req.body.estado = 1
  req.body.id_proyecto = 1 
  let meesaje = {
    estado:'success',
    text:'Vehiculo Creador correctamente'
  }

  for (let key in req.body) {
    if (req.body[key] === null) {
      meesaje.estado = 'danger',
      meesaje.text = 'Diligencie todos los campos'
      return res.render('vehiculo/add',{data:req.body,meesaje:meesaje});
    }
  }
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
  const users = await byid(req.params.id);
  await users.destroy()
  res.redirect('/vehiculo');
});

async function byid(id, fn) {
  return await Vehiculo.findOne({
    where: {
      id: id
    },
    limit:1
  });
}
module.exports = router;