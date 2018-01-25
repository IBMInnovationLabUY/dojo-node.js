var socket = io.connect('http://localhost:8080',{'forceNew': true}); //permite al cliente conectarse al servidor de node 

socket.on('message',function(data){//con socket.on escuchamos el metodo x
    console.log(data);
    render(data);
})

function render(data){
    var html = data.map(function(elem,index){ //iteramos sobre el array de mensajes
        return(`<div id="div_one_message">
                    <p id="name">${elem.author}:</p> <p id="text"> ${elem.text}</p>
                </div>`);
    }).join(" ");
    document.getElementById("div_message").innerHTML = html;
}

function addMessage(e){
    var payload = {
        author: document.getElementById('userName').value,
        text: document.getElementById('message').value

    }; 
    socket.emit('new_message',payload);
    return false;//esto hace que finalice la emision.
    //emitimos el evento
}