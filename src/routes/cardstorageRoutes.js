const express = require('express')
const router = express.Router()
const { getAllCardstorage,
        postStarCardstorage,
        getStarCardstorage,
        deleteStarCardstorage,
        searchCardstorage,
        getCompanyCardstorage,
        deleteCardstorage} = require('../controllers/cardstorageController')

// Get all namecard in cardstorage
router.route('/all').get(getAllCardstorage)
// Star a namecard in cardstorage
router.route('/star/:id').post(postStarCardstorage)
// Get all stared namecard in cardstorage
router.route('/star').get(getStarCardstorage)
// Delete star namecard in cardstorage
router.route('/star/delete/:id').post(deleteStarCardstorage)
// Delete namecard and cardstorage search in cardstorage
router.route('/:id').delete(deleteCardstorage).get(searchCardstorage)
// GET all namecard based on COMPANY
router.route('/').get(getCompanyCardstorage)


module.exports = router