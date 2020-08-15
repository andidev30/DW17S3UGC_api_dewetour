const express = require('express')
const router = express.Router()

const countryController = require('../controllers/countryController')

router.get('/country', countryController.shows)
router.get('/country/:id', countryController.show)


const userController = require('../controllers/userController')

router.get('/users', userController.shows)
router.get('/user/:id', userController.show)
router.delete('/user/:id', userController.show)

module.exports = router