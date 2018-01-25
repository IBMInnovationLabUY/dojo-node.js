var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({ //db connection
//propiedades...
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ejemploDB'
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    } else {
        console.log('Conexión exitosa!')
    }
})

app.get('/', function(req,res){

    connection.query("SELECT * FROM tablaEjemplo",function(err, rows, fields){
        if (!!err){
            console.log('Error in the query')
        } else {
            console.log('Solicitud exitosa!');
            console.log("Hello "+rows[0].name)//imprimimos la primer fila devuelta por la solicitud realizada
            res.send("Hello "+rows[0].name)//enviamos la primer fila devuelta por la solicitud realizada
            
           
          
        }
    })
})

app.listen(8080, function(){
    console.log('Escuchando en el puerto 8080')
})