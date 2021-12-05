const sequelizeErrorHandler = require('../sequelizeErrorHandler');

module.exports.users_get = async(req, res) => {
	res.send({"message": "users_get"})
}

module.exports.users_post = async(req, res) => {
	res.send({"message": "users_post"})
}

module.exports.user_get_by_uuid = async(req, res) => {
	res.send({"message": "user_get_by_uuid"})
}

module.exports.user_delete_by_uuid = async(req, res) => {
	res.send({"message": "user_delete_by_uuid"})
}