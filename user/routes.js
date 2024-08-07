
var express = require('express');
var router = express.Router();
const User = require('../model/User');
const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const users = await User.findAll();
  const usersData = users.map(user => user.toJSON());
  const values = ["#","Estado","Nombres","Apellidos","Correo","Documento","Herramientas"]
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

router.get('/logout',auth, async function(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
});

router.get('/add',auth, async function(req, res) {
  res.render('user/add',{data:{},meesaje:{}});
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
      return res.render('user/add',{data:req.body,meesaje:meesaje});
    }
  }

  const user = new User(req.body);

  try {
    await user.save();
    res.render('user/add',{data:{},meesaje:meesaje});
  } catch (error) {
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'
    res.render('user/add',{data:req.body,meesaje:meesaje});
  }
});

router.get('/remove/:id',auth, async function(req, res) {
  const users = await User.findOne({id:req.params.id});
  await users.destroy()
  res.redirect('/user');
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