const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('passport');

router.get('/me', userController.my_informations_get);
router.post('/me/updatePassword', userController.update_password_post);
router.post('/me/updateInfo', userController.update_user_post);

module.exports = router