const express = require('express');
const { engine } = require('express-handlebars'); // Importar la función engine
const app = express();
const port = 3000;

const userroute = require('./user/routes');

const sequelize = require('./db');

/**DB */
const User = require('./model/User');

// Configurar Handlebars como el motor de vistas
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: false, // Deshabilitar el uso de un layout predeterminado
    partialsDir: __dirname + '/views/partials', // Directorio de los parciales
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views'); // Directorio de las vistas

app.get('/', (req, res) => {
    //res.render('login', data);
    let usr = {
        intusuario:1,
        nombres:'nombres',
        apellidos:'apellidos',
        correo:'prueba@prueba.com',
        documento:123456,
        estado:1,
    }
    let usr2 = {
        intusuario:2,
        nombres:'nombres',
        apellidos:'apellidos',
        correo:'prueba@prueba.com',
        documento:123456,
        estado:1,
    }
    const user = new User(usr);
    const user2 = new User(usr2);
    user2.save()
    user.save()
    const users = User.findAll();
    res.json(users);

});

app.use('/user', userroute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
