var express = require('express');
var router = express.Router();
const Proyecto = require('../model/Proyecto');
const Estado = require('../model/Estado')

const auth = require('../midleware/auth')

const formatoFecha = require('../utils/formatofecha')

router.get('/', auth,async function(req, res) {
  const proyecto = await Proyecto.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    }
  ]
  });

  const values = ["#","Nombre","Estado","Correo","Fecha creacion","Telefono","Acciones"]
  res.render('proyecto/list', {datalist:procesarConForAsync(proyecto),headerlist:values});
});

function procesarConForAsync(proyecto) {
  const proyectodata = [];
  for (let i = 0; i < proyecto.length; i++) {
    const data = proyecto[i];
    data.dataValues.createdAt = formatoFecha(data.dataValues.createdAt)
    data.dataValues.estado = data.EstadoRelacion.nombre_estado;
    proyectodata.push(data.dataValues);
  }
  return proyectodata;
}




router.get('/add',auth, async function(req, res) {
    res.render('proyecto/add',{data:{},meesaje:{}});
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
      return res.render('proyecto/add',{data:req.body,meesaje:meesaje});
    }
    if (req.body[key] === '') {
      delete req.body[key];
    }
  }
  req.body.telefono =  parseInt(req.body.telefono)
  let proyecto = await byid(req?.body?.id_proyecto);
  if (proyecto){
    Object.assign(proyecto, req.body);
    await proyecto.save?.();
  }else{
    delete req.body.id_proyecto;
    proyecto = new Proyecto(req.body)
  }

  try {
    await proyecto.save();
    res.render('proyecto/add',{data:{},meesaje:meesaje});
  } catch (error) {
    meesaje.estado = 'danger'
    meesaje.text = 'Correo o documento duplicado '
    res.render('proyecto/add',{data:req.body,meesaje:meesaje});
  }
});


router.get('/editar/:id',auth, async function(req, res) {
  const proyecto = await byid(req?.params?.id);
  res.render('proyecto/add',{data:proyecto?.dataValues});
});

async function byid(id, fn) {
  return await Proyecto.findOne({
    where: {
      id_proyecto: id
    }
  });
}

module.exports = router;