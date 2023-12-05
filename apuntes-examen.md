# CHULETARIO SISTEMAS WEB I

## Arrancar proyecto

```
npm install
npm i bcrypt cookie-parser debug ejs express express-session http-errors morgan
npm audit fix
npm audit fix --force
npm fund
npm start

```

// instalar node.js, utilizar navegador para acceder a node.js y descargar ultima version
para comprobar que hemos instalado node correctamente
node -v

// creamos carpeta vacia
mkdir nombre_carpeta

// Crear proyecto de node por defecto
npm init -y

// te crea un fichero de configuracion package.json
vi package.json

// Instalar librerias necesarias, solucionar errores y añadir dependencia al proyecto
npm i bcrypt cookie-parser debug ejs express express-session http-errors morgan
npm audit fix
npm audit fix --force
npm fund

// Añadir script para iniciar proyecto lo añadimos en el fichero package.json debajo de la linea private
vi package.json
"scripts": {
    "start": "node ./bin/www"
  },

// Indicar donde se encuentra el fichero main del proyecto
vi package.json
"main": "app.js",

// Para cambiar el puerto ir al fichero bin/www
vi bin/www
// Buscar la linea -> var port = normalizePort(process.env.PORT || '3000');
// Por ejemplo si queremos cambiar el puerto a 4000 seria asi:
vi bin/www
var port = normalizePort(process.env.PORT || '4000');

// CREACION DEL SERVIDOR (app.js)
// Es el fichero principal que levanta nuestro servidor en clase suele ser app.js

// Para añadir nuevas paginas a un proyecto (app.js)
(crear ficheros) -> views/registro.ejs routes/registro.js
vi views/registro.ejs
vi routes/registro.js

(cargar rutas)
const registroRouter = require('./routes/registro');
app.use('/registro', registroRouter);

// Crear formulario de registro (registro ejs)
(copiamos codigo de login.ejs que va a ser parecido y añadir nuevos elementos)

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


