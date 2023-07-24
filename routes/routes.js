const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/', (req, res)=>{
    res.render('inicio')
})
router.get('/login', (req, res)=>{
    res.render('login')
})
router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/dashboard', (req, res)=>{
    res.render('main')
} )
router.get('/views', authController.help, authController.isAuthenticated)

//Router para los metodos del controler
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
module.exports = router