const express = require('express');
const morgan = require('morgan'); //este es para ver las peticiones por consola
const corse = require('cors'); // permite conexiones a otros dominios 

const pathologiesRoutes = require('./routes/rdbot.routes');

const app = express();

app.use(corse());
app.use(morgan('dev'));
app.use(express.json()); // para poder leer los archivos json

app.use(pathologiesRoutes)

//manejador de errores para todas las funciones!!
app.use((err, req, res, next) => {
    return res.json({
        message: error.message
    })
})

app.listen(4000)
console.log('Servidor escuchando puerto 4000')



