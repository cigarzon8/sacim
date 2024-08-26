var express = require('express');
var router = express.Router();
const Estado = require('../model/Estado')
const Cobros = require('../model/Cobros');
const moment = require('moment');


const auth = require('../midleware/auth')

router.get('/', auth,async function(req, res) {
  const cobro = await Cobros.findAll({
    include: [{
      model: Estado,
      as: 'TipoParqueaderoRelacion',
      attributes: ['NombreEstado'],
    },
    {
        model: Estado,
        as: 'EstadoRelacion',
        attributes: ['NombreEstado'],
    }
  ]
  });

  const cobrodata = cobro.map(cob =>{
     const vehiculoJson = cob.toJSON();
    vehiculoJson.estado = cob.EstadoRelacion.NombreEstado;
    return vehiculoJson
  } );

  const values = ["#","Estado","Placa","Tipo Vehiculo","Usuario"]
  res.render('list', {
      datalist:cobrodata,
      headerlist:values,
      base:"cobros"});
});


router.get('/add/:userid/:idtipovehiculo',auth, async function(req, res) {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  const OBJObject =   {
    valor:0,
      tiempo:0, 
      fechainicio:now, 
      fechafin:'0' ,
      fechacobro:'0',
      estado: 7,
      tipoveparqueadero:req.params.idtipovehiculo ,
    vehiculo: req.params.userid,
  }
  const cobrosNew = new Cobros(OBJObject)
  cobrosNew.save()

});



module.exports = router;