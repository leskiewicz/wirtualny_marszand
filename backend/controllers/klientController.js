require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');

const { Gallery, User, Role, Picture, sequelize } = require('../models')

const sequelizeErrorHandler = require('../sequelizeErrorHandler');

module.exports.sample_post = async (req, res, next) => { 
	res.json(req.user);
}

module.exports.all_hotel_galleries_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findAll({
			include: [{
			model: User,
			attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
			required: true,
			include: [{
				model: Role,
				attributes: {exclude: ['createdAt', 'updatedAt']},
				required: true,
				where: { "name": "HOTEL" }
			}]
		}],
	});
		res.send(gallery);
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.one_hotel_gallery_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findOne({
			include: [{
			model: User,
			attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
			required: true,
			include: [{
				model: Role,
				attributes: {exclude: ['createdAt', 'updatedAt']},
				required: true,
				where: { "name": "HOTEL" }
			}]
		}],
		where: { id: req.params.id }
	});
		res.send(gallery);
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.all_hotel_gallery_pictures_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findOne({
			include: [{
			model: User,
			attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
			required: true,
			include: [{
				model: Role,
				attributes: {exclude: ['createdAt', 'updatedAt']},
				required: true,
				where: { "name": "HOTEL" }
			}]
		}],
		where: { id: req.params.id }
	});

		if(gallery) {
			const pictures = await Picture.findAll({
				where: { galleryId: gallery.id}
			})
			res.send(pictures);
		} else {
			res.send({msg: "Taka galeria nie istnieje"});
		}
		
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.single_hotel_picture_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findOne({
			include: [{
			model: User,
			attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
			required: true,
			include: [{
				model: Role,
				attributes: {exclude: ['createdAt', 'updatedAt']},
				required: true,
				where: { "name": "HOTEL" }
			}]
		}],
		where: { id: req.params.id }
	});

		if(gallery) {
			const picture = await Picture.findOne({
				where: { id: req.params.pid, galleryId: gallery.id }
			})
			res.send(picture);
		} else {
			res.send({msg: "Taka galeria nie istnieje"});
		}
		
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}
