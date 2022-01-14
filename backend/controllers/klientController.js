require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');

const { QueryTypes } = require('sequelize');

const { Gallery, User, Role, Picture, Order, sequelize } = require('../models')

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
		res.status(200).send(gallery);
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
		res.status(200).send(gallery);
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
			res.status(200).send(pictures);
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
			res.status(200).send(picture);
		} else {
			res.send({msg: "Taka galeria nie istnieje"});
		}
		
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}


module.exports.buy_hotel_picture_post = async (req, res, next) => {

	try {
		const gallery = await Gallery.findOne({
		where: { id: req.params.id }
	});

		if(gallery) {
			const picture = await Picture.findOne({
				where: { id: req.params.pid, galleryId: gallery.id }
			})
			
			if(picture) {
				if(!picture.available) {
					res.send({msg: "Obraz nie jest dostępny do zakupu"});
				} else {

					const order = await Order.create({ userBuyId: req.user.id, userSellId: gallery.userId, pictureId: picture.id})

					await order.save();
					picture.available = false;
					await picture.save();

				res.status(200).send({msg: "Zakupiono obraz"});

				}
			} else {
				res.send({msg: "Taki obraz nie istnieje"});
			}
			
		} else {
			res.send({msg: "Taka galeria nie istnieje"});
		}
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.show_history_get = async (req, res, next) => {
	try {
		
		const out = await sequelize.query(
			'select orders.id, users.email as buyEmail, us.email as sellEmail, pictures.name, pictures.description, pictures.year, pictures.type, pictures.price, pictures.width, pictures.height from orders inner join users on orders.userBuyId = users.id join users us on orders.userSellId = us.id inner join pictures on orders.pictureId = pictures.id where orders.userBuyId = :uid',
			{
			  replacements: {uid: req.user.id},
			  type: QueryTypes.SELECT
			}
		  );

		  res.status(200).send(out);

	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.show_history_one_get = async (req, res, next) => {
	try {
		
		const out = await sequelize.query(
			'select orders.id, users.email as buyEmail, us.email as sellEmail, pictures.name, pictures.description, pictures.year, pictures.type, pictures.price, pictures.width, pictures.height from orders inner join users on orders.userBuyId = users.id join users us on orders.userSellId = us.id inner join pictures on orders.pictureId = pictures.id where orders.userBuyId = :uid and orders.id = :oid',
			{
			  replacements: {uid: req.user.id, oid: req.params.id },
			  type: QueryTypes.SELECT
			}
		  );

		  res.status(200).send(out);

	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}