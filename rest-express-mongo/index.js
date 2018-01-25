//DATABASE CONNECTION
const config = require('./config')
const mongoose = require('mongoose'); //en nuestro API primero debe estar corriendo nuestra base de datos
const app = require('./app')

mongoose.connect(config.db,(err,res) => {//url con direccion de la base de datos
    if (err) 
        return console.log(`Error al intentar conectarse a la base de datos : ${err}`);
    console.log('Conexion a la base de datos establecida...');
    //una vez conectado queremos que se conecte a la API por eso incluimos app.listen dentro
    app.listen(config.port, () => {
        console.log(`API REST CORRIENDO EN http://localhost:${config.port}`);
    });
});
