
var express = require('express');
var router = express.Router();
const User = require('../model/User');
const auth = require('../midleware/auth')

router.get('/', async function(req, res) {
  const users = await User.findAll();
  const usersData = users.map(user => user.toJSON());
  const values = ["#","Estado","Nombres","Apellidos","Correo","Documento"]
  res.render('user/list', {datalist:usersData,headerlist:values});
});

router.get('/bienvenido',auth, async function(req, res) {
  res.render('bienvenido');
});

router.post('/auth', async function(req, res) {
  const user = await authenticate(req.body.usuario, req.body.password)
  if (!user) res.redirect('/');
  req.session.user = user;
  res.redirect('/user/bienvenido');
});

router.get('/logout', async function(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
});

router.get('/add', async function(req, res) {
  res.render('user/add');
});

router.post('/add', async function(req, res) {
  req.body.estado = 1
  const user = new User(req.body);
  user.save()
  res.redirect('/user')
});

async function authenticate(name, pass, fn) {
  return await User.findOne({
    where: {
      password: pass,
      correo: name
    },
    limit:1
  });
}

module.exports = router;