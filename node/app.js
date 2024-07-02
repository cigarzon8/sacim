const express = require('express');
const { engine } = require('express-handlebars'); // Importar la función engine
const app = express();
const port = 3000;

const user = require('./user/routes');

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

const data = {
    title: 'Handlebars Example',
    books: [
        {
            title: 'Book 1',
            author: 'John Doe',
            synopsis: 'This is the synopsis of book 1.'
        },
        {
            title: 'Book 2',
            author: 'Jane Smith',
            synopsis: 'This is the synopsis of book 2.'
        },
        {
            title: 'Book 3',
            author: 'Bob Johnson',
            synopsis: 'This is the synopsis of book 3.'
        }
    ]
};

app.get('/', (req, res) => {
    //res.render('login', data);
    const users = User.findAll();
    res.json(users);

});

app.use('/user', user);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
