const Product = require('../models/product');

function getProductById(req,res){//accede a un producto particular
    let productId = req.params.productId;//el id del producto viene como parametro en la url 
    Product.findById(productId,(err,product) => {
        if (err) 
            return res.status(500).send({message: `Error al realizar la busqueda ${err}` })
        if (!product)
            return res.status(400).send({message: `El producto no existe`})
        
        res.status(200).send({ product: product});
    });
}

function getProducts(req,res){
    Product.find({}, (err, products) =>{
        if (err) 
            return res.status(500).send({message: `Error al realizar la busqueda ${err}` })
        if (!products)
            return res.status(400).send({message: `El producto no existe`})
        res.status(200).send({products: products});//codigo 200 indicando que se hizo en forma correcta
        })
      
}

function saveProduct(req,res){
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
}

function updateProduct(req,res){
    let productId = req.params.productId
    let update = req.body//campos que queremos actualizar
    Product.findByIdAndUpdate(productId,update, (err, productUpdated) =>{
        if (err)
            res.status(500).send({ message : `Error al actualizar ${err}`})
        res.status(200).send({ message : `El producto ha sido actualizado`})
    })
}

function deleteProduct(req,res){
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
}

module.exports = {
    getProductById,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}