const express = require('express')
const router = express.Router()
const {getProfile,updateProfile} = require('../controllers/profileController')

router.route('/').get(getProfile).post(updateProfile)

module.exports = router