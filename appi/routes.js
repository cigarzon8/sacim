var express = require('express');
var router = express.Router();
const User = require('../model/User');
const Estado = require('../model/Estado');
const Cobro = require('../model/Cobro');
const Parqueadero = require('../model/Parqueadero');
const Vehiculo = require('../model/Vehiculo');

const auth = require('../midleware/auth')

router.get('/', async function (req, res) {
    res.json({ Message: 'Bienvenido esto es una api' })
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