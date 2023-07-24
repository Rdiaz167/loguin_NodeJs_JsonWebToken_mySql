const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const connection = require('../db/connect')

//Procedimiento para registrarce
exports.register = async(req, res)=>{
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
        if(!name || !user || !pass){
            res.send('<a href="/register">Rellene los campos correctamente=></a>')
        }
        else{
            let passHash = await bcryptjs.hash(pass, 8)
            connection.query('INSERT INTO users SET ?', {user: user, name: name, pass: passHash}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/login')
        })}        
    } catch(error){
        console.log(error)
    }
}
//Procedimiento para loguearce
exports.login = async(req, res)=>{
    try{
        const user = req.body.user
        const pass = req.body.pass
        if(!user || !pass){
            res.send('<a href="/login">Ingrese las credenciales correctamente =></a>')
        }
        else{
            connection.query('SELECT * FROM users WHERE user = ?', [user], async(error, results)=>{
                if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                    res.send('<a href="/login">Ingrese las credenciales correctamente =></a>')
                }
                else{
                    // WebToken
                    // WebToken                    
                    const id = results[0].id
                    const token = jwt.sign({id:id, edad: '13'}, process.env.JWT_SECRET, {expiresIn: '1200000000'})
                    const cookiesOptions = {
                        // maxAge: 20000,
                        httpOnly: true
                    }
                    res.cookie('token', token, cookiesOptions)
                    res.redirect('/dashboard')
                }
            })
        }
    } catch(error){
        console.log(error)
    }
}
//Procedimiento para autenticarce
exports.isAuthenticated = (req, res, next)=>{ 
    jwt.verify(req.token, process.env.JWT_SECRET, (error, data)=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.render('private');
        }
        next();
    })
}
//Procedimiento para verficar token
exports.help = (req, res, next)=>{
    const tokenReq = req.cookies;
    if(typeof tokenReq !== 'undefined'){
        console.log(tokenReq.token)
        req.token = tokenReq.token;
        next();
    }else{
        res.sendStatus(403)
    }
}
//Procedimiento para desloguearce
exports.logout = (req, res)=>{
    res.clearCookie('token')
    return res.redirect('/')
}