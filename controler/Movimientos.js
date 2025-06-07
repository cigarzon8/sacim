var express = require('express');
var router = express.Router();
const Movimiento = require('../model/Movimientos');
const Estado = require('../model/Estado')
const Pagos = require('../model/Pago')
const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const moimientos = await Movimiento.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['NombreEstado'],
    }
  ],limit:10
  });

  const vehiculodata = moimientos.map(parq =>{
     const vehiculoJson = parq.toJSON();
    vehiculoJson.estado = parq.EstadoRelacion.NombreEstado;
    return vehiculoJson
  } );
  const values = ["#","Placa","Estado","Fecha Movimiento"]
  res.render('movimiento/list', {datalist:vehiculodata,headerlist:values});
});


router.get('/add',auth, async function(req, res) {
    res.render('movimiento/add',{data:{},meesaje:{}});
});

router.post('/add',auth, async function(req, res) {
  if(req.body.estado  == 'Ingresar'){
    req.body.estado = 7;
  }
  if(req.body.estado  == 'Salida'){
    req.body.estado = 8;
  }
  
  let meesaje = {
    estado:'success',
    text:'Usuario Creador correctamente'
  }


  for (let key in req   .body) {
    if (req.body[key] === null) {
      meesaje.estado = 'danger',
      meesaje.text = 'Diligencie todos los campos'
      return res.render('movimiento/add',{data:req.body,meesaje:meesaje});
    }
  }
  const movimiento = new Movimiento(req.body);

  try {
    const moviemtosnuevo = await movimiento.save();
    savepago(moviemtosnuevo.toJSON())

    res.redirect('/movimientos');
  } catch (error) {
    meesaje.estado = 'danger',
    meesaje.text = 'Correo o documento duplicado'+error
    res.render('movimiento/add',{data:req.body,meesaje:meesaje});
  }
});
async function savepago(idingreso,idsalida=0) {
  const pagonuevo ={
    placa:idingreso.placa,
    tiporenta:10,
    estado:1,
    idIngreso:idingreso.id,
    idSalida:1,
    pagoEstado:7,
    usuario:1,
    proyecto:1,
    Valor:0,
    facturaElectronica:false

  }
  const pago = new Pagos(pagonuevo).save();
}

module.exports = router;