var express = require('express');
var router = express.Router();
const User = require('../model/Usuario');
const Estado = require('../model/Estado');
const Cobro = require('../model/Cobros');
const Parqueadero = require('../model/Parqueadero');
const Vehiculo = require('../model/Vehiculo');
const TipousVehiculo = require('../model/Tipos_vehiculo')
const TipousUsuario = require('../model/Tipos_usuario')
//const authapi = require('../midleware/auth')

router.get('/ocupacionparqueadero', async function (req, res) {

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
    res.json({ vehiculodata})
});

router.post('/auth', async function (req, res) {
    const user = await authenticate(req.body.usuario, req.body.password)
    if (!user) res.json({ Message: 'Usuario y password invalidos' })
    req.session.user = user;
    res.json({ Message: 'okay', user })

});


router.get('/listausuarios', async function (req, res) {
    const users = await User.findAll();
    const user = users.map(user => user.toJSON());
    res.json({ Message: 'okay', user })
});

router.get('/listaestados', async function (req, res) {
    const estados = await Estado.findAll();
    const estadoslist = estados.map(data => data.toJSON());
    res.json({ Message: 'okay', estadoslist })
});

router.get('/listacobros', async function (req, res) {
    const cobros = await Cobro.findAll();
    const cobroslist = cobros.map(data => data.toJSON());
    res.json({ Message: 'okay', cobroslist })
});

router.get('/listaparqueaderos', async function (req, res) {
    const parqueaderos = await Parqueadero.findAll();
    const parqueaderoslist = parqueaderos.map(data => data.toJSON());
    res.json({ Message: 'okay', parqueaderoslist })
});

router.get('/listavehiculos', async function (req, res) {
    const vehiculos = await Vehiculo.findAll();
    const vehiculoslist = vehiculos.map(data => data.toJSON());
    res.json({ Message: 'okay', vehiculoslist })
});


async function authenticate(name, pass, fn) {
    return await User.findOne({
        where: {
            password: pass,
            correo: name
        },
        limit: 1
    });
}

module.exports = router;