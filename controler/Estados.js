var express = require('express');
var router = express.Router();
const Estado = require('../model/Estado')
const auth = require('../midleware/auth')
const { Op } = require('sequelize');


router.get('/', auth,async function(req, res) {
  const moimientos = await Estado.findAll();
  const estadoslist = moimientos.map(data => {
    return data.dataValues
  })
  const values = ["#ID","Nombre","Categoria","#ID_Categoria"]
  res.render('estados/list', {datalist:estadoslist,headerlist:values});
});


module.exports = router;