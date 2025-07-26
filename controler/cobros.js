var express = require('express');
var router = express.Router();
const Estado = require('../model/Estado')
const Cobros = require('../model/Cobros');
const Vehiculo = require('../model/Vehiculo');
const User = require('../model/Usuario');

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
    },
    {
        model: Vehiculo,
        as: 'vehiculodata',
        attributes: ['placa'],
    }
  ]
  });

  const cobrodata = cobro.map(cob =>{
     const vehiculoJson = cob.toJSON();
    vehiculoJson.estado = cob.EstadoRelacion.NombreEstado;
    vehiculoJson.relacion = cob.TipoParqueaderoRelacion.NombreEstado;
    vehiculoJson.placa = cob?.vehiculodata?.placa;
    return vehiculoJson
  } );

  const values = ["#","Estado","Tipo Vehiculo","Placa","Fecha inicio","Fecha fin","valor"]
  res.render('list', {
      datalist:cobrodata,
      headerlist:values,
      base:"cobros",
      agregar:false});
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

  const filstro = 
  {
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['NombreEstado'],
    },
    {
      model: Estado,
      as: 'TipoVehiculoRelacion',
      attributes: ['NombreEstado'],
    }
    ]
  }

  const vehiculo = await Vehiculo.findAll(filstro);
  const vehiculodata = vehiculo.map(vehi =>{
     const vehiculoJson = vehi.toJSON();
    vehiculoJson.estado = vehi.EstadoRelacion.NombreEstado;
    vehiculoJson.tipovehiculo = vehi.TipoVehiculoRelacion.NombreEstado;
    vehiculoJson.idtipovehiculo = vehi.tipovehiculo
    return vehiculoJson
  } );
  const users = await User.findAll();

  const values = ["#","Estado","Placa","Tipo Vehiculo","Usuario"]
  res.render('vehiculo/list', {datalist:vehiculodata,headerlist:values,users});

});



module.exports = router;