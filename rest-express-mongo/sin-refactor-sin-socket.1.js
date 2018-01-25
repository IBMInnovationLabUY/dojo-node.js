
const express = require('express');
const body_parser = require('body-parser');//middleware

const app = express();
const port = process.env.PORT || 3000 //Conectese a cualquier puerto o al 3000
const mongoose = require('mongoose'); //en nuestro API primero debe estar corriendo nuestra base de datos

const Product = require('./models/product');

app.use(body_parser.urlencoded({extended : false}));//utilizo el metodo use para agregar el middleware a la app
app.use(body_parser.json());//esto permite peticiones con cuerpo de mensaje en formato json

/*
app.get('/hola/:name',(req,res) => { //url a la que escucha el metodo- req = peticion, res = respuesta, name es un parametro
    res.send(`Hello ${req.params.name}!`);
    //res.end()//no envio nada
});*/

app.get('/api/product',(req,res) => { //accede a todos los productos
    Product.find({}, (err, products) =>{
    if (err) 
        return res.status(500).send({message: `Error al realizar la busqueda ${err}` })
    if (!products)
        return res.status(400).send({message: `El producto no existe`})
    
        res.status(200).send({products: products});//codigo 200 indicando que se hizo en forma correcta
    })
  
});

//busca en la base de datos un producto por su id
app.get('/api/product/:productId',(req,res) => { //accede a un producto particular
    let productId = req.params.productId;//el id del producto viene como parametro en la url 
    Product.findById(productId,(err,product) => {
        if (err) 
            return res.status(500).send({message: `Error al realizar la busqueda ${err}` })
        if (!product)
            return res.status(400).send({message: `El producto no existe`})
        
        res.status(200).send({ product: product});
    });
});

//misma ruta que en app.get pero tenemos distinto verbo por lo que express 
//diferenciara eso
app.post('/api/product', (req,res) => {
  /*console.log('POST /api/product');
  console.log(req.body);*/

  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description
  product.save((err,productStored) => {
    if(err)
        res.status(500).send({message: 'Error al guardar en la base de datos'});
    res.status(200).send({Product: productStored});//indicamos que se salvo correctamente
  });

});

//para actualizar un producto de la base de datos
app.put('/api/product/:productId',(req,res) => { 
    let productId = req.params.productId
    let update = req.body//campos que queremos actualizar
    Product.findByIdAndUpdate(productId,update, (err, productUpdated) =>{
        if (err)
            res.status(500).send({ message : `Error al actualizar ${err}`})
        res.status(200).send({ message : `El producto ha sido actualizado`})
    })
});

app.delete('/api/product/:productId',(req,res) => { 
    let product = req.params.productId;

    Product.findById(product, (err,product) =>{
        if (err)
            res.status(500).send({ message :`Error al eliminar: ${err}`})
        Product.remove(err => {
            if (err)
                res.status(500).send({ message :`Error al eliminar: ${err}`})
            res.status(200).send({ message: `El producto ha sido eliminado`})
        })
        
    })
});

mongoose.connect('mongodb://localhost:27017/shop',(err,res) => {//url con direccion de la base de datos
    if (err) 
        return console.log(`Error al intentar conectarse a la base de datos : ${err}`);
    console.log('Conexion a la base de datos establecida...');
    //una vez conectado queremos que se conecte a la API por eso incluimos app.listen dentro
    app.listen(port, () => {
        console.log(`API REST CORRIENDO EN http://localhost:${port}`);
    });
});
