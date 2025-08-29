var express = require('express');
var router = express.Router();
const Proyectopago = require('../model/Proyectopago');
const Estado = require('../model/Estado')
const TipoPagos =  require('../model/Tipos_pagos')
const auth = require('../midleware/auth')

const formatoFecha = require('../utils/formatofecha')
const procesoArray = require('../utils/procesoArray')
const FormatNumber = require('../utils/FormatNumber')

router.get('/', auth,async function(req, res) {
  const proyectopago = await Proyectopago.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    },{
      model: TipoPagos,
      as: 'PagoEstado',
      attributes: ['nombre_estado'],
    },
    
  ]
  });

  const values = ["#","Estado","pago","Fecha inicio licencia","Fecha fin licencia","valor","Acciones"]
  res.render('proyectopago/list', {datalist:procesarConForAsync(proyectopago),headerlist:values});
});


router.get('/add',auth, async function(req, res) {
  
  const pagoestadoList1 = await TipoPagos.findAll()
  const date = new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' });
  const colombiaDate = new Date(date);

  // Formatear a YYYY-MM-DD manualmente
  const year = colombiaDate.getFullYear();
  const month = String(colombiaDate.getMonth() + 1).padStart(2, '0');
  const day = String(colombiaDate.getDate()).padStart(2, '0');


  const hoy = `${year}-${month}-${day}`;


  const pagoestadoList = await procesoArray(pagoestadoList1)
  res.render('proyectopago/add',{data:{},meesaje:{},pagoestadoList,hoy});
});

router.post('/add',auth, async function(req, res) {
  req.body.estado = 1
  req.body.id_proyecto = 1

  let meesaje = {
    estado:'success',
    text:'Cobro para el proyecto Creador correctamente'
  }
  for (let key in req.body) {
    if (req.body[key] === null) {
      meesaje.estado = 'danger',
      meesaje.text = 'Diligencie todos los campos'
      return res.render('proyectopago/add',{data:req.body,meesaje:meesaje});
    }
  }
  let ProyectopagoObject = await byid(req?.body?.id_pago_proyecto);

  if (ProyectopagoObject){
    Object.assign(Proyectopago, req.body);
    await ProyectopagoObject.save?.();
  }else{
    delete req.body.id_pago_proyecto;
    ProyectopagoObject = new Proyectopago(req.body)
  }

  try {
 
    const dd = await ProyectopagoObject.save();
    meesaje.text = 'Proceso realizado correctamente'
    res.render('proyectopago/add',{data:{},meesaje:meesaje});
  } catch (error) {
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'+error
    res.render('proyectopago/add',{data:req.body,meesaje:meesaje});
  }
});

async function byid(id, fn) {
  return await Proyectopago.findOne({
    where: {
      id_pago_proyecto: id
    }
  });
}

router.get('/ver/:id',auth, async function(req, res) {

  let id = req?.params?.id 

  if (id){
  const proyectopago = await Proyectopago.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    },{
      model: TipoPagos,
      as: 'PagoEstado',
      attributes: ['nombre_estado'],
    },
    
  ],
  where: {
      id_pago_proyecto: id
    }
  });

  const Desatalle = procesarConForAsync(proyectopago)
  res.render('proyectopago/view',{data:Desatalle});
  }


});


function procesarConForAsync(proyectopago) {
  const proyectopagodata = [];
  for (let i = 0; i < proyectopago.length; i++) {
    const data = proyectopago[i];
    data.dataValues.fecha_fin_licencia = formatoFecha(data.dataValues.fecha_fin_licencia)
    data.dataValues.fecha_inici_licencia = formatoFecha(data.dataValues.fecha_inici_licencia)

    data.dataValues.createdAt = formatoFecha(data.dataValues.createdAt)
    data.dataValues.updatedAt = formatoFecha(data.dataValues.updatedAt)


    data.dataValues.estado = data.EstadoRelacion.nombre_estado;
    data.dataValues.pagoestado = data.PagoEstado.nombre_estado;

    data.dataValues.valor = FormatNumber(data.dataValues.valor);

    proyectopagodata.push(data.dataValues);
  }
  return proyectopagodata;
}


module.exports = router;