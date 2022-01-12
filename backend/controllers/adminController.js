require('dotenv').config();
const { User, Role, sequelize } = require('../models')

const sequelizeErrorHandler = require('../sequelizeErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.sample_post = async (req, res, next) => { 
	res.json(req.user);
}
