module.exports = {
    port: process.env.PORT || 3000,//Conectese a cualquier puerto o al 3000
    db: 'mongodb://localhost:27017/shop',
    SECRET_TOKEN: 'miClaveDeTokens'//generalmente codigo mas complicado
}