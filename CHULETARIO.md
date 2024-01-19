# SISTEMAS WEB I

https://github.com/bereilhp/web/tree/main/web1

## Credenciales 
```
i.martinpena

i.martinpena@usp.ceu.es

NI: 105462
```

## Configuración GIT
1º Paso: configuración
```
git config --global user.name "i.martinpena"
git config --global user.email i.martinpena@usp.ceu.es
```
2º Paso: commit 
```
git commit -am "comentarios"
```
3º Paso: push
```
git push
```

## Crear proyecto nuevo desde cero 
```
node -v
mkdir nombre_carpeta
npm init -y
```

## Crear proyecto con express generator
```
npx express-generator -v ejs "nombre_que_quiero_poner_al_proyecto"
cd "nombre_que_quiero_poner_al_proyecto"
npm install
npm i bcrypt cookie-parser debug ejs express express-session http-errors morgan winston sequelize sqlite3 socket.io
npm audit fix
npm audit fix --force
npm fund
```

## Arrancar proyecto
```
npm install
npm i bcrypt cookie-parser debug ejs express express-session http-errors morgan winston sequelize sqlite3 socket.io
npm audit fix
npm audit fix --force
npm fund
npm start
```

## Añadir script para iniciar proyecto con npm start (package.json)
```
// Debajo de la linea private
"scripts": {
    "start": "node ./bin/www"
  },
```

## Indicar donde se encuentra el fichero main del proyecto (package.json)
```
vi package.json
"main": "app.js",
```

## Para cambiar el puerto (bin/www)
```
vi bin/www
// Buscar la linea -> var port = normalizePort(process.env.PORT || '3000');
// Por ejemplo si queremos cambiar el puerto a 4000 seria asi:
var port = normalizePort(process.env.PORT || process.argv[2] || '4000');
```

## Indicar puerto al levantar proyecto PORT=3200 npm start (bin/www)
```
// PORT=3200 npm start
let port = normalizePort("3000");
if(process.env.PORT) {
    port = normalizePort(process.env.PORT)
}
```

## Estructura codigo HTML simple
```
<!DOCTYPE html >
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="title" content="Mi primer HTML5">
    <meta name="description" content="Ejemplo de HTML5">
    <meta name="keywords" content="HTML5, CSS, Javascript">
    <title>Mi primer HTML5</title>
  </head>
  <body>
    Cuerpo de la página
  </body>
</html>
```

## Para añadir nuevas paginas (REGISTRO) a un proyecto 
1º Paso: Crear ficheros .js y ejs
```
vi views/register.ejs
vi routes/register.js
```
2º Paso: cargar rutas.
```
vi app.js
const registroRouter = require('./routes/register');
app.use('/registro', registerRouter);
```
3º Paso: crear codigo HTML para página de register y que verifique si las contraseñas son iguales, tiene mas de 8 caracteres(register.ejs)
```
<%- include("header", {}) %>
<h1>Register</h1>
<form method="post" action="/register" onsubmit="return validateForm()">
    <label>Username: </label> <input type="text" name="user" required><br>
    <label>Password: </label> <input type="password" id="pass" name="pass" required><br>
    <label>Confirm Password: </label> <input type="password" id="confirm_pass" required><br>
    <button type="submit">Submit</button>
</form>
<script>
    function validateForm() {
        var password = document.getElementById("pass").value;
        var confirmPassword = document.getElementById("confirm_pass").value;
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    }
</script>
<%- include("footer", {}) %>
```
4º Paso: Crear funcionalidad de registro (register.js)
```
const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
    res.render('register', {user: req.session.user});
});

router.post('/', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    try {
        await database.user.register(user, pass);
        req.session.user = {username: user};
        req.session.message = "¡Registro exitoso!"
        res.redirect("login");
    } catch (error) {
        req.session.error = error.message;
        res.redirect("register");
    }
});

module.exports = router;
```

5º Paso: añadir en la barra de navegacion la opcion de register (header.ejs)
```
vi views/header.ejs
// Debajo de login
<li class="nav-item">
    <a class="nav-link" href="/register">Register</a>
</li>
```

## Para añadir SOCKET.IO a un proyecto.

```
npm install socket.io
```


1º Paso: Aceptar conexiones WebSocket a traves de Socket.io (bin/www)
```
// Debajo de var server = http.createServer(app)
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  // Cuando recibas un mensaje 'chat message', lo emitirás a todos los clientes.
  socket.on('chat message', (data) => {
    io.emit('chat message', data); // Envía el mensaje y el nombre de usuario a todos los clientes
  });
});


// Cambiar server.listen por esto:
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

```
2º Paso: añadir al header un boton de chat para que le lleve a la pagina solo cuando este logeado el usuario (views/header.ejs)
```
// dentro del head
<script src="/socket.io/socket.io.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

// debajo de logout
<li class="nav-item">
    <a class="nav-link" href="/chat">Chat</a>
</li>
```
3º Paso: cargar pagina chat (app.js)
```
// cada linea de codigo en su correspondiente lugar
var chatRouter = require('./routes/chat');
app.use('/chat', chatRouter);
```
4º Paso: añadir fichero chat.js (routes/chat.js)
```
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', {user:req.session.user, username:req.session.user.username});
});

module.exports = router;

```
5º Paso: añadir fichero chat.ejs (views/chat.ejs)
```
<%- include("header", {}) %>
<h1>CHAT</h1>
<ul id="messages"></ul>
<form id="form" action="" class="chat">
    <input id="input" autocomplete="off" /><button>Send</button>
</form>
<script>
    $(function () {
        var socket = io();
        $('form').submit(function(e) {
            e.preventDefault(); // previene la recarga de la página
            socket.emit('chat message', { message: $('#input').val(), username: '<%= username %>' });
            $('#input').val('');
            return false;
        });
        socket.on('chat message', function(data) {
            $('#messages').append($('<li>').text(data.username + ': ' + data.message));
        });
    });
</script>
<%- include("footer", {}) %>
```
6º Paso: añadir css chat.css, para poner bonito el chat (public/stylesheets/chat.css)
```
form.chat{
  background: lightgray;
  padding: 5px;
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
}
#input{
  flex-grow: 1;
}
```

## Crear una pagina (usuarios) con una tabla dinamica donde se muestren los usuarios

1º Paso: Crear ficheros .js y ejs
```
vi views/usuarios.ejs
vi routes/usuarios.js
```
2º Paso: cargar rutas.
```
vi app.js
const usuariosRouter = require('./routes/usuarios');
app.use('/usuarios', usuariosRouter);
```
3Aº Paso: crear funcion para obtener usuarios. (users.js)
```
// Encima de register
users.getAllUsers = function() {
    return Object.values(users);
}
```
3Bº Paso: crear funcion para obtener usuarios. (/database/models/user.model.js)
```
users.getAllUsers = function() {
    return Object.values(users.data);
}
```

4º Paso: crear codigo HTML para página de usuarios (usuarios.ejs)
```
<%- include("header", {}) %>
<h1><%= title %></h1>
<table>
    <thead>
    <tr>
        <th>Username</th>
        <th>Password (Hashed)</th>
    </tr>
    </thead>
    <tbody>
    <% for (let i = 0; i < allUsers.length; i++) { %>
        <tr>
            <td><%= allUsers[i].username %></td>
            <td><%= allUsers[i].hash %></td>
        </tr>
    <% } %>
    </tbody>
</table>
<%- include("footer", {}) %>
```
5Aº Paso: Crear funcionalidad de usuarios (usuarios.js)
```
const express = require('express');
const router = express.Router();
const users = require('../users');

router.get('/', function(req, res, next) {
    const allUsers = users.getAllUsers();
    res.render('usuarios', { title: 'Usuarios', allUsers, user: req.session.user });
});

module.exports = router;
```

5Bº Paso: Crear funcionalidad de usuarios (usuarios.js)
```
const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
    const allUsers = database.user.getAllUsers();
    res.render('usuarios', { title: 'Usuarios', allUsers, user: req.session.user });
});

module.exports = router;
```

6º Paso: añadir en la barra de navegacion la opcion de usuarios (header.ejs)
```
vi views/header.ejs
// Debajo de logout
<li class="nav-item">
  <a class="nav-link" href="/usuarios">Usuarios</a>
</li>
```

## Añadir a la pagina usuarios una columna nueva donde se le añada un boton para que unicamente el usuario admin pueda eliminar usuarios.

1Aº Paso: crear funcion para eliminar usuarios. (users.js)
```
// Debajo de register
users.deleteUser = function(username) {
    return new Promise((resolve, reject) => {
        if (users[username]) {
            delete users[username];
            resolve();
        } else {
            reject(new Error(`Usuario ${username} no encontrado`));
        }
    });
};
```
1Bº Paso: crear funcion para eliminar usuarios. (/database/models/user.model.js)
```
users.deleteUser = function(username) {
    return new Promise((resolve, reject) => {
        if (users.data[username]) {
            delete users.data[username];
            resolve();
        } else {
            reject(new Error(`Usuario ${username} no encontrado`));
        }
    });
};
```

2º Paso: crear fichero para alerta de confirmacion para eliminar usuario (/public/deleteUser.js)
```
// vi /public/deleteUser.js
const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    if(!deleteUser(username)){
        event.preventDefault();
    }
});
function deleteUser(username) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${username}?`)) {
        fetch(`/usuarios/deleteUser?username=${username}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Puedes recargar la página o actualizar la tabla según tus necesidades
                    location.reload();
                } else {
                    console.error('Error al eliminar el usuario');
                }
            })
            .catch(error => console.error('Error:', error));
    }
}
```
3º Paso: crear codigo HTML para página de usuarios (usuarios.ejs)
```
// Borrar contenido y pegar todo lo siguiente
<%- include("header", {}) %>
<h1><%= title %></h1>
<table>
    <thead>
    <tr>
        <th>Username</th>
        <th>Password (Hashed)</th>
        <% if (user.username === 'admin') { %>
            <th>Action</th>
        <% } else if (user.username !== 'admin') { %>
            <th></th>
        <% } %>
    </tr>
    </thead>
    <tbody>
    <% for (let i = 0; i < allUsers.length; i++) { %>
        <tr>
            <td><%= allUsers[i].username %></td>
            <td><%= allUsers[i].hash %></td>
            <% if (user.username === 'admin') { %>
            <td>
                <% if (allUsers[i].username !== 'admin' && allUsers[i].username !== undefined) { %>
                    <button type="submit" class="delete-button" onclick="deleteUser('<%= allUsers[i].username %>')">Delete</button>
                <% } %>
            </td>
            <% } else { %>
                <td></td>
            <% } %>
        </tr>
    <% } %>
    </tbody>
</table>
<script type="text/javascript" src="/deleteUser.js"></script>
<%- include("footer", {}) %>
```
4Aº Paso: Crear nueva funcionalidad de usuarios (usuarios.js)
```
// Borrar contenido y pegar todo lo siguiente
const express = require('express');
const router = express.Router();
const users = require('../users');

router.get('/', function(req, res, next) {
    const allUsers = users.getAllUsers();
    const currentUser = req.session.user;
    res.render('usuarios', { title: 'Usuarios', currentUser, allUsers, user: req.session.user});
});

router.post('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.body.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await users.deleteUser(usernameToDelete);
            res.redirect('/usuarios');
        } else {
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        res.status(500).send(`Error al eliminar usuario: ${error.message}`);
    }
});

router.delete('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.query.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await users.deleteUser(usernameToDelete);
            res.json({ success: true, message: `Usuario ${usernameToDelete} eliminado correctamente.` });
        } else {
            res.status(403).json({ success: false, message: 'Forbidden' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar usuario: ${error.message}` });
    }
});

module.exports = router;
```

4Bº Paso: Crear nueva funcionalidad de usuarios (usuarios.js)
```
const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
    const allUsers = database.user.getAllUsers();
    const currentUser = req.session.user;
    res.render('usuarios', { title: 'Usuarios', currentUser, allUsers, user: req.session.user });
});

router.post('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.body.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await database.user.deleteUser(usernameToDelete);
            res.redirect('/usuarios');
        } else {
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        res.status(500).send(`Error al eliminar usuario: ${error.message}`);
    }
});

router.delete('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.query.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await database.user.deleteUser(usernameToDelete);
            res.json({ success: true, message: `Usuario ${usernameToDelete} eliminado correctamente.` });
        } else {
            res.status(403).json({ success: false, message: 'Forbidden' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar usuario: ${error.message}` });
    }
});

module.exports = router;
```
## Funcion middleware
```
app.use('/restricted', restricted, restrictedRouter);

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("login");
  }
}
```
## Mostrar una tabla dinámica en una página EJS a partir de un JSON

1º Paso: Crea el archivo EJS (pedidos.ejs):
```
<!-- pedidos.ejs -->
<%- include("header", { title: "Pedidos" }) %>
<h1>Pedidos</h1>
<table>
    <thead>
        <tr>
            <th>Tamaño</th>
            <th>Precio</th>
            <th>Toppings</th>
            <th>Queso Extra</th>
            <th>Delivery</th>
            <th>Cliente</th>
        </tr>
    </thead>
    <tbody>
        <% for (let i = 0; i < pedidos.length; i++) { %>
            <tr>
                <td><%= pedidos[i].tamano %></td>
                <td><%= pedidos[i].precio %></td>
                <td><%= pedidos[i].toppings ? pedidos[i].toppings.join(', ') : 'N/A' %></td>
                <td><%= pedidos[i].queso_extra ? 'Sí' : 'No' %></td>
                <td><%= pedidos[i].delivery ? 'Sí' : 'No' %></td>
                <td>
                    <%= pedidos[i].cliente.nombre %><br>
                    Teléfono: <%= pedidos[i].cliente.telefono || 'N/A' %><br>
                    Correo: <%= pedidos[i].cliente.correo || 'N/A' %>
                </td>
            </tr>
        <% } %>
    </tbody>
</table>
<%- include("footer", {}) %>
```

2º Paso: configurar archivo de rutas (pedidos.js):
```
const express = require('express');
const router = express.Router();
const pedidosData = require('../database/pedidos.json');

router.get('/', function(req, res, next) {
    res.render('pedidos', { title: 'Pedidos', pedidos: pedidosData.pedidos });
});

module.exports = router;
```
3º Paso: estructura del archivo JSON (pedidos.json)
```
{
    "pedidos": [
        {
            "tamano": "pequeña",
            "precio": 15.25,
            "toppings": ["champiñones", "peperoni", "albahaca"],
            "queso_extra": false,
            "delivery": true,
            "cliente": {
                "nombre": "Pepe Lotas",
                "telefono": null,
                "correo": "pepelotas@gmail.com"
            }
        },
        {
            "tamano": "grande",
            "precio": 12.43,
            "toppings": null,
            "queso_extra": true,
            "delivery": false,
            "cliente": {
                "nombre": "Sara Renovell",
                "telefono": "6364872023",
                "correo": null
            }
        }
    ]
}
```
4º Paso: Configura las rutas en tu aplicación principal (app.js)
```
const pedidosRouter = require('./routes/pedidos');
app.use('/pedidos', pedidosRouter);
```

5º Paso: asegúrate de tener las carpetas y archivos necesarios:
```
- views/
  - pedidos.ejs
  - header.ejs
  - footer.ejs
- routes/
  - pedidos.js
- database/
  - pedidos.json
- app.js
- package.json
```









