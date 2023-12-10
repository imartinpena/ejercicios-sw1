# SISTEMAS WEB I

## Crear proyecto nuevo desde cero 

```
node -v
mkdir nombre_carpeta
npm init -y
express --ejs
express --ejs nombre_fichero_main.js 
```

## Arrancar proyecto

```
npm install
npm i bcrypt cookie-parser debug ejs express express-session http-errors morgan
npm audit fix
npm audit fix --force
npm fund
npm start
```

## Añadir script para iniciar proyecto con npm start 
```
vi package.json
// Debajo de la linea private
"scripts": {
    "start": "node ./bin/www"
  },
```

## Indicar donde se encuentra el fichero main del proyecto
```
vi package.json
"main": "app.js",
```

## Para cambiar el puerto 
```
vi bin/www
// Buscar la linea -> var port = normalizePort(process.env.PORT || '3000');
// Por ejemplo si queremos cambiar el puerto a 4000 seria asi:
var port = normalizePort(process.env.PORT || '4000');
```

## Para añadir nuevas paginas (REGISTRO) a un proyecto 
1º Paso: Crear ficheros .js y ejs
```
vi views/registro.ejs
vi routes/registro.js
```
2º Paso: cargar rutas.
```
vi app.js
const registroRouter = require('./routes/registro');
app.use('/registro', registroRouter);
```
3º Paso: crear codigo HTML para página de registro (registro.ejs)
```
// copiamos codigo de login.ejs que va a ser parecido y añadir nuevos elementos
vi views/registro.ejs
<%- include("header", {}) %>
<h1>Login</h1>
// Cambiamos ruta de login a registro
<form method="post" action="/registro">
    <label>Username: </label> <input type="text" name="user"><br>
    <label>Password: </label> <input type="password" name="pass"><br>
    // Añadimos nueva celda para confirmar contraseña
    <label>Confirm Password: </label> <input type="password" name="confirmPass"><br>
    <button type="submit">Submit</button>
</form>
<%- include("footer", {}) %>
```
4º Paso: Crear funcionalidad de registro (registro.js)
```
vi routes/registro.js
const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registro', { title: 'Registro', user: req.session.user});
});

router.post('/', function(req, res, next){
    let user = req.body.user;
    let pass = req.body.pass;
    let confirmPass = req.body.confirmPass;

    if (pass.length >= 8 && pass === confirmPass) {
        if(!users[user]){
            users.register(user, pass, function() {
                req.session.user = users[user];
                req.session.message = "Welcome!";
                res.redirect("/restricted");
            });
        } else {
            req.session.error = "El usuario ya existe";
            res.redirect("/registro");
        }
    } else {
        req.session.error = "Las constraseñas no coinciden o tiene menos de 8 caracteres";
        res.redirect("/registro");
        }
    });

module.exports = router;
```

5º Paso: añadir en la barra de navegacion la opcion de registro (header.ejs)
```
vi views/header.ejs
// Debajo de login
<li class="nav-item">
    <a class="nav-link" href="/registro">Registro</a>
</li>
```

6º Paso: crear pagina html estatica (registro.html)
```
<!DOCTYPE html>
<html>
<head>
    <title>login</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Armazón</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                < if (user) { >
                <li class="nav-item">
                    <a class="nav-link" href="/restricted">Restricted</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Logout</a>
                </li>
                < } else { >
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/registro">Registro</a>
                </li>
                < }>
            </ul>
            < if (user) { >
            <div class="d-flex">Welcome <= user.username >!</div>
            < } >
        </div>
    </div>
</nav>
<div class="container">
    <h1><= title ></h1>
    <form method="post" action="/login">
        <label>Username:</label>
        <input type="text" id="user" name="user"><br>
        <label>Password:</label>
        <input type="password" id="pass" name="pass"><br>
        <label>Confirm Password:</label>
        <input type="password" id="confirmPass" name="confirmPass"><br>
        <button type="submit">Submit</button>
    </form>
</div> <!-- End container -->
<% if (message) { %>
<div class="alert alert-primary alert-dismissible" role="alert">
    <div><%- message %></div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
<% } if (error) { %>
<div class="alert alert-danger alert-dismissible" role="alert">
    <div><%- error %></div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
<% } %>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>
```







