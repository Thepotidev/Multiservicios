const express = require('express'); 
const session = require('express-session');
const bodyParser = require('body-parser');
const path = requiee('path');


const app = express();


//Configuraciones
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: '12345678', //Cambiar para una clave más segura
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

//Ruta principal
app.get('/', (req, res) => {
    res.redirect('/routes/auth.js/views/login.ejs');
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});