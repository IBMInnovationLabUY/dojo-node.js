const express = require('express');
const api = express.Router();
const productCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')
const userCtrl = require('../controllers/user')
api.get('/product',productCtrl.getProducts)

//busca en la base de datos un producto por su id
api.get('/product/:productId',productCtrl.getProductById)

//misma ruta que en app.get pero tenemos distinto verbo por lo que express 
//diferenciara esocontrollersapp
api.post('/product',productCtrl.saveProduct)

//para actualizar un producto de la base de datos
api.put('/product/:productId',auth,productCtrl.updateProduct)//auth- previo al acceso

api.delete('/product/:productId',auth,productCtrl.deleteProduct)

api.get('/private',auth, function(req,res){
    res.status(200).send({message: 'Tienes acceso'})
})
api.post('/signup',userCtrl.signUp)
api.post('/signin',userCtrl.signIn)

module.exports = api