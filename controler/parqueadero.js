var express = require('express');
var router = express.Router();
const Parqueadero = require('../model/Parqueadero');
const TipoParqueadero = require('../model/Tipos_parqueadero')
const Estado = require('../model/Estado')
const TipousVehiculo = require('../model/Tipos_vehiculo')
const TipousUsuario = require('../model/Tipos_usuario')
const procesoArray = require('../utils/procesoArray')
const auth = require('../midleware/auth')



router.get('/', auth,async function(req, res) {
  const parqueo = await Parqueadero.findAll({
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
        model: TipousUsuario,
        as: 'TipoUsuario',
        attributes: ['nombre_estado'],
    }

    
  ]
  });

  const vehiculodata = parqueo.map(parq =>{
    const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.EstadoRelacion.nombre_estado;
    vehiculoJson.tipoVehiculo = parq.TipoVehiculo.nombre_estado;
    vehiculoJson.tipoUsuario = parq.TipoUsuario.nombre_estado;
    vehiculoJson.disponibles = parq.capacidad - parq.ocupacion;
    return vehiculoJson
  } );

  console.log('vehiculodata',vehiculodata)
  const values = ["#","Estado","Tipo Vehiculo","Tipo de usuario","Capacidad","Ocupacion","Disponible"]
  res.render('parqueadero/list', {datalist:vehiculodata,headerlist:values});
});


router.get('/edit/:id',auth, async function(req, res) {
  let parqueadero = await byid(req.params.id);
  if (parqueadero) parqueadero = parqueadero.dataValues
  const allparameter = await allparameters()
  res.render('parqueadero/add',{data:{parqueadero,allparameter},meesaje:{}});

});

router.get('/add',auth, async function(req, res) {
  const allparameter = await allparameters()
  res.render('parqueadero/add',{data:{allparameter},meesaje:{}});
});

router.post('/add',auth, async function(req, res) {
  console.log('req.body',req.body)
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
  const users = await byid(req.params.id);
  await users.destroy()
  res.redirect('/parqueadero');
});
async function byid(id_parqueadero, fn) {
  return await Parqueadero.findOne({
    where: {
      id_parqueadero
    }
  });
}

async function allparameters(){
  const TipoParqueaderos1 = await TipoParqueadero.findAll()
  const TipoParqueaderos = await  procesoArray(TipoParqueaderos1)
  const Estados1 = await Estado.findAll()
  const Estados = await  procesoArray(Estados1)
  const TipousVehiculos1 = await TipousVehiculo.findAll()
  const TipousVehiculos = await  procesoArray(TipousVehiculos1)
  const TipousUsuarios1 = await TipousUsuario.findAll()
  const TipousUsuarios = await  procesoArray(TipousUsuarios1)

  return {TipoParqueaderos,Estados,TipousVehiculos,TipousUsuarios}
}

module.exports = router;