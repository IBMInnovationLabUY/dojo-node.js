
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name : {type: String, index: { unique: true }},
    picture : String,
    price : {type : Number, default : 0},
    category : { type:String, enum: ['computers','phones','others']},//solo tendra una de estas categorias
    description : String
});

module.exports = mongoose.model('Product',ProductSchema);//permite exportar el schema para poder utilizado desde cualquier otro lugar de la aplicacion.