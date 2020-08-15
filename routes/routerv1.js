const express = require('express')
const router = express.Router()

const countryController = require('../controllers/countryController')

router.get('/country', countryController.shows)
router.get('/country/:id', countryController.show)

module.exports = router