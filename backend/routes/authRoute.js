const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const adminAuth = require('../middlewares/adminAuth')
const passport = require('passport');

router.post('/register', authController.register_post)
router.post('/login', authController.login_post)
router.get('/token', passport.authenticate('jwt', { session: false }), authController.token_test)
//router.get('/check', passport.authenticate('jwt', { session: false }), adminAuth, authController.token_check_get)

module.exports = router