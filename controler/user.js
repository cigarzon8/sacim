
var express = require('express');
var router = express.Router();
const User = require('../model/Usuario');
const Estado = require('../model/Estado')
const TipoDocumentos = require('../model/Tipos_documentos')
const auth = require('../midleware/auth')
const procesoArray = require('../utils/procesoArray')

router.get('/', auth,async function(req, res) {
  const users = await User.findAll({
    include: {
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    }
  });

  const usersData = users.map(
    user => {
      const userJson = user.toJSON();
      console.log('user.Estado',userJson)
      userJson.estado = user.EstadoRelacion.nombre_estado;
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
  const tiposDocumentos1 = await TipoDocumentos.findAll()
  const tiposDocumentos = await  procesoArray(tiposDocumentos1)
  res.render('user/add',{data:{},tiposDocumentos,meesaje:{}});
});

router.get('/myprofile/:id',auth, async function(req, res) {

  let id_usuario = req?.session?.user?.id_usuario
  if(req.params.id && req.params.id != 0){
    id_usuario = req.params.id
  }
    let user = await byid(id_usuario)
    if (!user) return  res.redirect('/user');
    user = user.toJSON()
 const tiposDocumentos1 = await TipoDocumentos.findAll()
  const tiposDocumentos = await  procesoArray(tiposDocumentos1)
    res.render('user/add',{data:user,tiposDocumentos,meesaje:{}});
});


router.post('/myprofile',auth, async function(req, res) {

  let meesaje = {
    estado:'success',
    text:'Usuario Creador correctamente'
  }
 const tiposDocumentos1 = await TipoDocumentos.findAll()
  const tiposDocumentos = await  procesoArray(tiposDocumentos1)
  try {
  const user = await User.findOne({id:req.body.id_usuario});

  user.set({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo:req.body.correo,
    password:req.body.password
  });

  meesaje.text = 'Usuario Actualizado correctamente'
  user.save();

  res.render('user/add',{data:user.toJSON(),tiposDocumentos,meesaje:meesaje});

  } catch (error) {
    console.log('error',error)
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'
    res.render('user/add',{data:req.body,tiposDocumentos,meesaje:meesaje});
  }
});


router.post('/add',auth, async function(req, res) {
  req.body.id_proyecto = 1 
  req.body.estado = 1
  req.body.id_rol = 2
   const tiposDocumentos1 = await TipoDocumentos.findAll()
  const tiposDocumentos = await  procesoArray(tiposDocumentos1)
  let meesaje = {
    estado:'success',
    text:'Usuario Creador correctamente'
  }


  for (let key in req.body) {
    if (req.body[key] === null) {
      meesaje.estado = 'danger',
      meesaje.text = 'Diligencie todos los campos'
      return res.render('user/add',{data:req.body,tiposDocumentos,meesaje:meesaje});
    }
  }
  req.body.proyecto = req?.session?.user?.proyecto || 1
  const user = new User(req.body);

  try {
    await user.save();
    return res.render('user/add',{data:{},tiposDocumentos,meesaje:meesaje});
  } catch (error) {
    console.log('error',error)
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'
    return res.render('user/add',{data:req.body,meesaje:meesaje});
  }
});

router.get('/remove/:id',auth, async function(req, res) {
  const users = await byid(req.params.id);
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

async function byid(id_usuario, fn) {
  return await User.findOne({
    where: {
      id_usuario
    },
    limit:1
  });
}

module.exports = router;