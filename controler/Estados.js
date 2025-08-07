var express = require('express');
var router = express.Router();
const Estado = require('../model/Estado')



const TipoPagos = require('../model/Tipos_pagos')
const TipoDocumentos = require('../model/Tipos_documentos')
const TipousUsuario = require('../model/Tipos_usuario')
const TipoMovimiento = require('../model/Tipos_movimiento')
const TipoFacturacion = require('../model/Tipos_facturacion')
const TipoParqueadero = require('../model/Tipos_parqueadero')
const TipousVehiculo = require('../model/Tipos_vehiculo')




const auth = require('../midleware/auth')
const { Op } = require('sequelize');


router.get('/', auth, async function(req, res) {
  const arrayTipos = [
    Estado,
    TipoPagos,
    TipoDocumentos,
    TipousUsuario,
    TipoMovimiento,
    TipoFacturacion,
    TipoParqueadero,
    TipousVehiculo
  ];
  const arrayTiposString = [
    'Estado',
    'Estados de Pagos',
    'Tipos de Documentos',
    'Tipos de Usuario',
    'Tipos de Movimiento',
    'Tipos de Facturacion',
    'Tipos de Parqueadero',
    'Tipos de Vehiculo'
  ];
  try {
    const results = await Promise.all(arrayTipos.map(model => model.findAll()));
  const datalist = results.map((res, i) => ({
    nombre: arrayTiposString[i],
    datos: processEstados(res)
  }));
    const values = ["#ID", "Nombre"];
    res.render('estados/list', { datalist, headerlist: values });

  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).send('Error al cargar los datos');
  }
});

function processEstados(processEstado) {
  const processEstadoData = [];

  for (let i = 0; i < processEstado.length; i++) {
    const data = processEstado[i].dataValues;

    // Buscar la primera clave que empieza por "id_"
    for (const key in data) {
      if (key.startsWith('id_')) {
        data.id = data[key]; // Agrega un campo genérico "id"
        break;
      }
    }

    processEstadoData.push(data);
  }

  return processEstadoData;
}


module.exports = router;