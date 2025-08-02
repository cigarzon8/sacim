module.exports = function formatoFecha(fechasin) {
    const fecha = new Date(fechasin);
    return fecha.toLocaleString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
}