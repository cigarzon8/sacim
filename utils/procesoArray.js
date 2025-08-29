module.exports = async function procesoArray(proyecto) {
  const data = [];
  for (let i = 0; i < proyecto.length; i++) {
    data.push(proyecto[i].dataValues);
  }
  return data;
}
