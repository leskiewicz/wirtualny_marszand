const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.users_get)
router.post('/', userController.users_post)
router.get('/:uuid', userController.user_get_by_uuid)
router.delete('/:uuid',userController.user_delete_by_uuid)

module.exports = router