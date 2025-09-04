'use strict'

const express = require('express');
const { engine } = require('express-handlebars');
var session = require('express-session');
var path = require('path');

const app = express();
const port = 3000;


//controller
const estados = require('./controler/Estados')
const proyecto = require('./controler/Proyecto')
const Proyectopago = require('./controler/Proyectopago')



const userroute = require('./controler/user');
const vehiculeroute = require('./controler/vehiculo')
const parqueaderoroute = require('./controler/parqueadero')
const cobrosroute = require('./controler/cobros')

const movimientos = require('./controler/Movimientos')
const pagos = require('./controler/Pagos')
const valores = require('./controler/Valores')
const api = require('./appi/routes')


/**DB */
const sequelize = require('./db');

const init = require('./init_db');


// Configurar expresss
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: false, // Deshabilitar el uso de un layout predeterminado
    partialsDir: __dirname + '/views/partials', // Directorio de los parciales
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views'); // Directorio de las vistas
app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public','img', 'favicon.ico'))
app.get('/', (req, res) => {
    res.render('login');
});



app.use('/estados', estados);
app.use('/proyecto',proyecto)
app.use('/proyectopago',Proyectopago)
app.use('/user', userroute);
app.use('/vehiculo',vehiculeroute)
app.use('/valores',valores)
app.use('/movimientos',movimientos)
app.use('/pagos',pagos)


app.use('/parqueadero',parqueaderoroute)
app.use('/api',api)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
