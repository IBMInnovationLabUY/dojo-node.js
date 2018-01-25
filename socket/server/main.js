var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    id: 1,
    text: "Hola soy un mensaje",
    author: "Juan Fajardo"
}]
app.use(express.static('./public'))//static = middleware que trae express. Indicamos que queremos public static
app.get('/',function(req,res){ 
    res.status(200).send('hola mundo');
})

io.on('connection', function(socket){ //socket abierto en ese momento- cliente web que manda el mensaje
    console.log("Alguien se ha conectado");
    socket.emit('message', messages)
    socket.on('new_message',function(data){
        messages.push(data);
        io.sockets.emit('message',messages)//avisamos a TODOS los demas que tenemos un nuevo mensaje
                                //emitiendo un mensaje utilizando el servidor completo io
    })
})

server.listen(8080,function(){
    console.log('Servidor corriendo');
})
