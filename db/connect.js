const mysql = require('mysql');
const connection = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: 3306,
    password: process.env.DB_PASS
});

connection.connect((error)=>{
    if(error)
        throw error
    else {
        console.log('Conectado a base de datos Mysql.')
        console.log('*********************************')
    }
})

module.exports = connection