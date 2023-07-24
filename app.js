const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const PORT = 3000;

//config carpeta publica
app.use(express.static('public'));

//config motor de plantillas 
app.set('view engine', 'ejs');

//para procesar datos provenientes de forms
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//variables de entorno
dotenv.config({path:'./env/.env'});

//para poder trabajar con cookies
app.use(cookieParser());

//Rutas desde Routes
app.use('/', require('./routes/routes'))

//Levantando server
app.listen(PORT, ()=>{
    console.log('*********************************')
    console.log(`*** Sever up on port: ${PORT} ***`)
    console.log('*********************************')
});