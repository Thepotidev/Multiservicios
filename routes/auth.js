const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//Simulacion de usuarios (reemplazar con una base de datos)
const users = [{ username: 'admin', password: '12345678'}];

// Middleware para parsear el cuerpo de la solicitud
router.use(bodyParser.urlencoded({ extended: true }));

//Renderizar el formulario de inicio de sesion
router.get('/views/login.ejs', (req, res) => {
    res.render('/views/login.ejs');
});

//Manejar el inicio de sesion
router.post('/views/login.ejs', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.redirect('/routes/clients.js/views/dashboard.ejs');
    } else {
        res.render('/views/login.ejs', {message: 'Usuario o contraseña invalida'});
    }
});

//Cerrar sesion
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('views/login.ejs');
    });
});

module.exports = router;