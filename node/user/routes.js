
var express = require('express');
var router = express.Router();
const User = require('../model/User');

router.get('/', async function(req, res) {
  const users = await User.findAll();
  const usersData = users.map(user => user.toJSON());
  res.render('list', {datalist:usersData});
});

router.get('/bienvenido', async function(req, res) {
  const users = await User.findAll();
  const usersData = users.map(user => user.toJSON());
  res.render('bienvenido', {datalist:usersData});
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