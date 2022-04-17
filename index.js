//Cargar express
const express = require('express'); // -> npm i express
const cors = require('cors');
const dbConnection = require('./database/config');

// Libreria variables de entorno -> npm i dotenv
require('dotenv').config();

// Extraer el puerto de las variables de entorno
const { PORT } = process.env;

// crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público ( use→ middleware ), aqui se cargara la app de React.js
app.use(express.static('public'));

// Lectura y parseo del body (middleware)
app.use(express.json());
// Lo de require (Router) lo carga en /api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



// escuchar peticiones
app.listen(PORT, () => {
    console.log(`Servidor en puerto: ${ PORT }`);
});
