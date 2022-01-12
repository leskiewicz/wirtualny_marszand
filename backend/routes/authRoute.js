const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require('passport');

router.post('/register', authController.register_post)
router.post('/login', authController.login_post)
router.get('/token', passport.authenticate('jwt', { session: false }), authController.token_test)

module.exports = router