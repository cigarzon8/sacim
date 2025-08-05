const Estado = require('../model/Estado');

module.exports = async function EstadoById(id_categoria) {
  const estadoslist = await Estado.findAll({
    where: {
      id_categoria
    }
  })
  const proyectopagodata = [];
  for (let i = 0; i < estadoslist.length; i++) {
    proyectopagodata.push(estadoslist[i]?.dataValues);
  }
  return proyectopagodata;
}

