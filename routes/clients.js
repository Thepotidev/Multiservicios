const express = require('express');
const router = express.router();
const clients = []; //Aqui almacenaremos los clientes

//Vericar si el usuario esta autenticado
function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.redirect();
}

// Renderizar la vista de clientes
router.get('/views/dashboard.ejs', isAuthenticated, (req, res) => {
    res.render('dashboard', { clients });
});

// Manejar la creación de un nuevo cliente
router.post('/routes/clients.js', isAuthenticated, (req, res) => {
    const { nombres, apellidos, telefono, direccion, marca, modelo, año, transmision, color, falla, observaciones, tipoModulo } = req.body;

    const newClient = {
        id: clients.length + 1,
        nombres,
        apellidos,
        telefono,
        direccion,
        vehiculo: { marca, modelo, año, transmision, color, falla, observaciones, tipoModulo },
        fechaCreacion: new Date(),
        fechaModificacion: null,
    };

    clients.push(newClient);
    res.redirect('views/dashboard.ejs');
})

module.exports = router;