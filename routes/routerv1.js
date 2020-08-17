const express = require('express')
const router = express.Router()

//middleware login
const authenticated = require('../middleware/authenticated');

//routes auth
const authController = require('../controllers/authController')

router.post('/register', authController.register)
router.post('/login', authController.login)

//routes country
const countryController = require('../controllers/countryController')

router.get('/country', countryController.shows)
router.get('/country/:id', countryController.show)
router.put('/country/:id', authenticated.cekLogin, countryController.update)
router.delete('/country/:id', authenticated.cekLogin, countryController.destroy)
router.post('/country', authenticated.cekLogin, countryController.store)

//routes user
const userController = require('../controllers/userController')

router.get('/users', userController.shows)
router.get('/user/:id', userController.show)
router.delete('/user/:id', userController.destroy)

//routes trip
const tripController = require('../controllers/tripController')

router.get('/trips', tripController.shows)
router.get('/trip/:id', tripController.show)
router.post('/trip', authenticated.cekLogin, tripController.store)
router.delete('/trip/:id', authenticated.cekLogin, tripController.destroy)
router.patch('/trip/:id', authenticated.cekLogin, tripController.update)

//routes transaction
const transactionController = require('../controllers/transactionController')

router.post('/transaction', authenticated.cekLogin, transactionController.store)
router.put('/transaction/:id', authenticated.cekLogin, transactionController.update)
router.get('/transaction/:id', transactionController.show)
router.get('/orders', transactionController.shows)

module.exports = router