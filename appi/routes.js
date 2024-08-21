var express = require('express');
var router = express.Router();
const User = require('../model/User');
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


router.get('/listaUsuarios', async function (req, res) {
    const users = await User.findAll();
    const user = users.map(user => user.toJSON());
    res.json({ Message: 'okay', user })
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