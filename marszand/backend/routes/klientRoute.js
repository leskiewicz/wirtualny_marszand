const express = require('express')
const router = express.Router()
const klientController = require('../controllers/klientController')

router.get('/galleries', klientController.all_hotel_galleries_get)
router.get('/galleries/:id', klientController.one_hotel_gallery_get)
router.get('/galleries/:id/pictures', klientController.all_hotel_gallery_pictures_get)
router.get('/galleries/:id/pictures/:pid', klientController.single_hotel_picture_get)

module.exports = router