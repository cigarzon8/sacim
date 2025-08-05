const request = require('supertest');
const express = require('express');
const proyectoRouter = require('../controler/Proyecto'); // asegúrate de usar la ruta correcta

// Crear una app de prueba que monte solo ese router
const app = express();

// Simular render (evita error de `res.render`)
app.set('views', './views'); // puedes dejarlo si tienes views reales
app.set('view engine', 'hbs'); // o el motor que uses

// Mock del método render para el test
app.response.render = function (view, options) {
  this.status(200).json({ view, options });
};

app.use('/proyecto', proyectoRouter);

describe('GET /proyecto', () => {
  it('debe devolver la vista list con la lista y meesaje vacíos', async () => {
    const res = await request(app).get('/proyecto');
    expect(res.statusCode).toBe(200);
    expect(res.body.view).toBe('proyecto');
    expect(res.body.options).toEqual({ data: {}, meesaje: {} });
  });
});

describe('GET /proyecto/add', () => {
  it('debe devolver la vista add con data y meesaje vacíos', async () => {
    const res = await request(app).get('/proyecto/add');
    expect(res.statusCode).toBe(200);
    expect(res.body.view).toBe('proyecto/add');
    expect(res.body.options).toEqual({ data: {}, meesaje: {} });
  });
});

describe('GET /proyecto/editar/:id', () => {
it('debe devolver la vista edit para un ID (mock)', async () => {
    const res = await request(app).get('/proyecto/add');
    expect(res.statusCode).toBe(200);
    expect(res.body.view).toBe('proyecto/editar/1');
    expect(res.body.options).toHaveProperty('data');
    expect(res.body.options).toHaveProperty('meesaje');
});
});