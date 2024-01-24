const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register', user: req.session.user });
});

router.post('/', function(req, res, next) {
  // Coger el name del html del input
  const user = req.body.user;
  const pass = req.body.pass;

  // Verifica si el usuario ya existe
  if (database.user.data.hasOwnProperty(user)) {
    req.session.error = `El usuario: ${user} ya existe.`;
    res.redirect("/register");
  } else {
    // Intenta registrar al usuario
    database.user.register(user, pass);
    // Registro exitoso
    req.session.user = {username: user};
    req.session.message = "¡Registro correcto!";
    res.redirect("/restricted");
  }
});

module.exports = router;
