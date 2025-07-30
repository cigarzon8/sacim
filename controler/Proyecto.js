var express = require('express');
var router = express.Router();
const Proyecto = require('../model/Proyecto');
const Estado = require('../model/Estado')

const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const proyecto = await Proyecto.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    }
  ]
  });

  const proyectodata = proyecto.map(data => {
    data.dataValues.estado = data.EstadoRelacion.nombre_estado;
    return data.dataValues
  })

  const values = ["#","Nombre","Estado","Correo","Fecha creacion","Telefono","Acciones"]
  res.render('proyecto/list', {datalist:proyectodata,headerlist:values});
});


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
  }
  req.body.estado = 1;
  const proyecto = new Proyecto(req.body);

  try {
    await proyecto.save();
    res.render('proyecto/add',{data:{},meesaje:meesaje});
  } catch (error) {
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'+error
    res.render('proyecto/add',{data:req.body,meesaje:meesaje});
  }
});

router.get('/remove/:id',auth, async function(req, res) {
  const users = await byid(req.params.id);
  await users.destroy()
  res.redirect('/proyecto');
});
router.get('/editar/:id',auth, async function(req, res) {
  const values = ["#","Nombre","Estado","Correo","Fecha creacion","Telefono","Acciones"]
  res.render('proyecto/add');
});
async function byid(id, fn) {
  return await Proyecto.findOne({
    where: {
      id: id
    },
    limit:1
  });
}

module.exports = router;