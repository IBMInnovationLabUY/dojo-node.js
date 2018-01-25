const express = require('express');
const hbs = require('express-handlebars')
const body_parser = require('body-parser');//middleware
const api = require('./routes')


const app = express();

app.use(body_parser.urlencoded({extended : false}));//utilizo el metodo use para agregar el middleware a la app
app.use(body_parser.json());//esto permite peticiones con cuerpo de mensaje en formato json
app.engine('.hbs',hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine','hbs')

app.use('/api',api)
app.get('/login',(req,res) => {
    res.render('login')
})
app.get('/', (req,res) => {
    res.render('product')
})

module.exports = app