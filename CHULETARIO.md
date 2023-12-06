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

## Para añadir nuevas paginas a un proyecto 
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
3º Paso: crear codigo HTML para página de registro (registro ejs)
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
4º Paso: creamos get post (registro.js)
```
```

5º Paso: añadir en la barra de navegacion la opcion de registro
```
vi /views/header.ejs
// Debajo de login
<li class="nav-item">
    <a class="nav-link" href="/registro">Registro</a>
</li>
```






