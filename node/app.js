'use strict'

const express = require('express');
const { engine } = require('express-handlebars');
var hash = require('pbkdf2-password')()
var session = require('express-session');


const app = express();
const port = 3000;
var path = require('path');

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

app.get('/', (req, res) => {
    /*let usr = {
        intusuario:1,
        nombres:'nombres',
        apellidos:'apellidos',
        correo:'prueba@prueba.com',
        documento:123456,
        estado:1,
        password:'123'
    }
    const user = new User(usr);
    user.save()*/
    res.render('login');

});

app.use('/user', userroute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
