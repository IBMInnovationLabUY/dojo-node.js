const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
    const payload = {
        sub: user._id, //id de usuario, ideal no sea el de mongo por seguridad
        iat: moment.unix() , //unix = tiempo en formato unix//cuando fue creado el token
        exp: moment().add(14, 'days').unix()//en que momento expira el token
    }

    return jwt.encode(payload,config.SECRET_TOKEN )
}

function decodeToken(token) {
    const decoded = new Promise((resolve,reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if (payload.exp <= moment.unix())
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })

            resolve(payload.sub)
        }catch(err){
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}