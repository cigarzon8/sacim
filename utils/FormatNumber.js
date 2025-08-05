module.exports   = (number) => {
  return new Intl.NumberFormat('en-US').format( number); // Ej: 1,000.50
};