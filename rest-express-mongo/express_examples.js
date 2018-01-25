const express = require('express');
const body_parser = require('body-parser');//middleware

const app = express();
const port = process.env.PORT || 3000 //Conectese a cualquier puerto o al 3000

app.use(body_parser.urlencoded({extended : false}));//utilizo el metodo use para agregar el middleware a la app
app.use(body_parser.json());//esto permite peticiones con cuerpo de mensaje en formato json

app.get('/',(req,res) => {
    res.send('Hello World!');
});

app.post('/',(res,rej) => {
    res.send('Hello World!');
});

app.put('/',(res,rej) => {
    res.send('Hello World!');
});

app.delete('/',(res,rej) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`API REST CORRIENDO EN http://localhost:${port}`);
});