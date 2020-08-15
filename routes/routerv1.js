const express = require('express')
const router = express.Router()

//routes auth
const authController = require('../controllers/authController')

router.post('/register', authController.register)

//routh country
const countryController = require('../controllers/countryController')

router.get('/country', countryController.shows)
router.get('/country/:id', countryController.show)

//route user
const userController = require('../controllers/userController')

router.get('/users', userController.shows)
router.get('/user/:id', userController.show)
router.delete('/user/:id', userController.destroy)

module.exports = router