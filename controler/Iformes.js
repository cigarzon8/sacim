var express = require('express');
var router = express.Router();
const { createObjectCsvStringifier } = require('csv-writer');


const Parqueadero = require('../model/Parqueadero');
const TipoParqueadero = require('../model/Tipos_parqueadero')
const Estado = require('../model/Estado')
const Movimiento = require('../model/Movimientos');
const Pagos = require('../model/Pago')
const Valores = require('../model/Valores')
const Vehiculo = require('../model/Vehiculo');
const TipousVehiculo = require('../model/Tipos_vehiculo')
const TipousUsuario = require('../model/Tipos_usuario')
const procesoArray = require('../utils/procesoArray')
const auth = require('../midleware/auth')


router.get('/', auth,async function(req, res) {
  res.render('informes/list', {});
});

router.get('/backup', async function (req, res) {
  try {
  const parqueaderos = await Movimiento.findAll({
    include: [{
      model: Estado,
      as: 'EstadoRelacion',
      attributes: ['nombre_estado'],
    },{
      model: Vehiculo,
      as: 'IdVehiculo',
      attributes: ['placa'],
    },
  ],      raw: true,
      nest: true,
  });
console.log('parqueaderos',parqueaderos)
    // Definir cabeceras del CSV
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'id', title: 'ID' },
        { id: 'Estado', title: 'Movimiento' },
        { id: 'Placa', title: 'Placa' },
        { id: 'hora', title: 'Hora de acción' },
      ],
    });

    // Mapeamos los datos
    const data = parqueaderos.map((p) => (
     {
       id: p.id_movimiento,
      Estado: p.EstadoRelacion?.nombre_estado || '',
      Placa: p.IdVehiculo?.placa || '',
      hora: p.createdAt || '',
    }));
    console.log('data',data)
    // Generar CSV con cabeceras + registros
    const csv =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('informe_parqueaderos.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando CSV' });
  }
});



module.exports = router;