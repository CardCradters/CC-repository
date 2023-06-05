const express = require('express')
const router = express.Router()
const {
    getUserdetail,
    saveUserdetail
} = require('../controllers/userdetailController')


router.route('/:id').get(getUserdetail).post(saveUserdetail)

module.exports = router