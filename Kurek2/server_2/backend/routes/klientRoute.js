const express = require('express')
const router = express.Router()
const klientController = require('../controllers/klientController')

//router.get('/pictures', klientController.all_hotel_pictures_get)

/*
router.get('/galleries', klientController.all_hotel_galleries_get)
router.get('/galleries/:id', klientController.one_hotel_gallery_get)
router.get('/galleries/:id/pictures', klientController.all_hotel_gallery_pictures_get)
router.get('/galleries/:id/pictures/:pid', klientController.single_hotel_picture_get)
*/

//router.post('/galleries/:id/pictures/:pid/buy', klientController.buy_hotel_picture_post)

router.get('/shop/pictures', klientController.all_pictures_shop_get);
router.get('/shop/pictures/:id', klientController.one_picture_shop_get);
router.post('/shop/pictures/:id/buy', klientController.buy_hotel_picture_post);

router.get('/pictures', klientController.all_pictures_get);
router.get('/pictures/:id', klientController.one_picture_get);

router.get('/transactions/', klientController.show_history_get)
router.get('/transactions/:id', klientController.show_history_one_get)

module.exports = router