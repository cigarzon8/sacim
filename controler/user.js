
var express = require('express');
var router = express.Router();
const User = require('../model/User');
const Estado = require('../model/Estado')
const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const users = await User.findAll({
    include: {
      model: Estado,
      attributes: ['NombreEstado'],
    },
  });

  const usersData = users.map(
    user => {
      const userJson = user.toJSON();
      userJson.estado = user.Estado.NombreEstado;
      return userJson;
    }
    );
    const values = ["#","Estado","Nombres","Apellidos","Correo","Documento","Herramientas"]

  res.render('user/list', {datalist:usersData,headerlist:values});
});

router.get('/bienvenido',auth, async function(req, res) {
  res.render('bienvenido');
});

router.post('/auth', async function(req, res) {
  const user = await authenticate(req.body.usuario, req.body.password)
  let meesaje = {
    estado:'danger',
    text:'Usuario o contraseña incorrecto'
  }
  if (!user) return res.render('login',{meesaje:meesaje});
  req.session.user = user;
  return res.redirect('/user/bienvenido');
});

router.get('/logout',auth, async function(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
});

router.get('/add',auth, async function(req, res) {
  res.render('user/add',{data:{},meesaje:{}});
});

router.get('/myprofile/:id',auth, async function(req, res) {

  let userid = req.session.user.userid
  if(req.params.id && req.params.id != 0){
    userid = req.params.id
  }

  console.log('userid',userid)
    let user = await byid(userid)
    user = user.toJSON()
    res.render('user/add',{data:user,meesaje:{}});
});


router.post('/myprofile',auth, async function(req, res) {

  let meesaje = {
    estado:'success',
    text:'Usuario Creador correctamente'
  }
  try {
  const user = await User.findOne({id:req.body.userid});

  user.set({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo:req.body.correo,
    password:req.body.password
  });

  meesaje.text = 'Usuario Actualizado correctamente'
  user.save();

  res.render('user/add',{data:user.toJSON(),meesaje:meesaje});

  } catch (error) {
    console.log('error',error)
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'
    res.render('user/add',{data:req.body,meesaje:meesaje});
  }
});


router.post('/add',auth, async function(req, res) {
  console.log('add')
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
    return res.render('user/add',{data:{},meesaje:meesaje});
  } catch (error) {
    console.log('error',error)
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'
    return res.render('user/add',{data:req.body,meesaje:meesaje});
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

async function byid(id, fn) {
  return await User.findOne({
    where: {
      userid: id
    },
    limit:1
  });
}

module.exports = router;