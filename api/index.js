const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

// Importa los routers de tus otros archivos
const computeRouter = require('./compute');
const studentsRouter = require('./students');

const app = express();

// Aplica bodyParser para poder parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Rutas
app.use('/compute', computeRouter);
app.use('/students', studentsRouter);

// Manejo de solicitudes en la raíz
app.get('/', (req, res) => {
    res.send('Pagina de prueba.');
});

// Inicia el servidor en el puerto 3000 si no estamos en un entorno serverless
if (!process.env.LAMBDA_TASK_ROOT) {
  app.listen(3000, () => console.log('Local app listening on port 3000'));
}

// Exporta tu aplicación como una función serverless
module.exports.handler = serverless(app);
