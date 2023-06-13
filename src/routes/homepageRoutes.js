const express = require('express')
const router = express.Router()
const { homepage, homepageSearch } = require('../controllers/homepageController')

router.route('/').get(homepage)
router.route('/:id').get(homepageSearch)

module.exports = router