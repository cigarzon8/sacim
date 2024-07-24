'use strict'

const express = require('express');
const { engine } = require('express-handlebars');
var session = require('express-session');
var path = require('path');

const app = express();
const port = 3000;


//routes
const userroute = require('./user/routes');



/**DB */
const sequelize = require('./db');
const User = require('./model/User');



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


app.use('/static', express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public','img', 'favicon.ico'))
app.get('/', (req, res) => {
    res.render('login');
});

app.use('/user', userroute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
