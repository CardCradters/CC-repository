const express = require('express')
const router = express.Router()
const { uploadImage } = require('../controllers/uploadimageController')
const instance = require('../config/firebase')

const upload = instance.upload

router.route('/').post(upload.single('file'),uploadImage)

module.exports = router