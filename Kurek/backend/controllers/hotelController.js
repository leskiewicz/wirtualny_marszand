require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');

const { Gallery, User, Role, Picture, sequelize, Order } = require('../models')

const { QueryTypes } = require('sequelize');

const sequelizeErrorHandler = require('../sequelizeErrorHandler');

module.exports.new_gallery_post = async (req, res, next) => {
	try {
		const gallery = await Gallery.create({ name: req.body.name })

		const user = await User.findOne({
			where: {
				id: req.user.id
			}
		});
		
		await gallery.setUser(user);
		await user.addGallery(gallery);

		await gallery.save();
		res.status(200).send({msg: "Utworzono nową galerię"});
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.all_artists_galleries_get = async (req, res, next) => {
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
				where: { "name": "ARTYSTA" }
			}]
		}],
	});
		res.status(200).send(gallery);
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.new_picture_in_gallery = async (req, res, next) => {
	const uuid = uuidv4();
	const qrLocation = 'qrcodes/'+ uuid +'.png';
	const qrLocationFile = process.env.SERVER_NAME + qrLocation;
	//'http://localhost:3000/artysta/galleries/me/' + + '/pictures/:id'
	//const envHost = "http://localhost:3000/"
	
	try {
		const file = req.file
		const imgLocationFile = process.env.SERVER_NAME + 'pictures/' + file.filename;

		if (!file) {
			res.status(404).send({msg: "Nie podano obrazu"});
		}
		
		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.status(404).send({msg: "Taka galeria nie istnieje"});
		}
		
		if(gallery.userId != req.user.id) {
			res.status(404).send({msg: "Nie możesz dodawać obrazów do nie swojej galerii"});
		} else {
			const picture = await Picture.create({ name: req.body.name, imageLocation: imgLocationFile, description: req.body.description, year: req.body.year, type: req.body.type, price: req.body.price, width: req.body.width, height: req.body.height, qrCodeLocation: qrLocationFile});

			await picture.setGallery(gallery);
			await gallery.addPicture(picture);
		
			await picture.save();

			const fullLink = process.env.SERVER_NAME + 'hotel/galleries/me/'+ gallery.id + '/pictures/' + picture.id;

			qr.toFile('public/' + qrLocation, fullLink, (err) => {
				if(err) {
					res.status(404).send({msg: "Nie udalo sie zapisac qrCode"});
				}
			})

			res.status(200).send({msg: "Dodano nowy obraz do galerii"});
		}
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.one_gallery_by_id_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.status(404).send({msg: "Taka galeria nie istnieje"});
		}

		res.status(200).send(gallery);
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.all_images_from_gallery_by_id_get = async (req, res, next) => {
	try {

		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.status(404).send({msg: "Taka galeria nie istnieje"});
		}

		const pictures = await Picture.findAll({ where: { galleryId: req.params.id }, attributes: {exclude: ['GalleryId']} });
		res.status(200).send(pictures);
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.all_galleries_me_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findAll({ where: { userId: req.user.id } });
		res.status(200).send(gallery);
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.single_picture_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.status(404).send({msg: "Taka galeria nie istnieje"});
		}

		const picture = await Picture.findOne({ where: {galleryId: req.params.id, id: req.params.pid }})
		res.status(200).send(picture);
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.one_artist_gallery_get = async (req, res, next) => {
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
				where: { "name": "ARTYSTA" }
			}]
		}],
		where: { id: req.params.id }
	});
		res.status(200).send(gallery);
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.all_artist_gallery_pictures_get = async (req, res, next) => {
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
				where: { "name": "ARTYSTA" }
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
			res.status(404).send({msg: "Taka galeria nie istnieje"});
		}
		
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.single_artist_picture_get = async (req, res, next) => {
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
				where: { "name": "ARTYSTA" }
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
			res.status(404).send({msg: "Taka galeria nie istnieje"});
		}
		
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}


module.exports.buy_artist_picture_post = async (req, res, next) => {

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
				res.status(404).send({msg: "Taki obraz nie istnieje"});
			}
			
		} else {
			res.status(404).send({msg: "Taka galeria nie istnieje"});
		}
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.show_history_get = async (req, res, next) => {
	try {
		
		const out = await sequelize.query(
			'select orders.id, orders.createdAt, users.email as buyEmail, us.email as sellEmail, pictures.name, pictures.description, pictures.year, pictures.type, pictures.price, pictures.width, pictures.height from orders inner join users on orders.userBuyId = users.id join users us on orders.userSellId = us.id inner join pictures on orders.pictureId = pictures.id where orders.userBuyId = :uid or orders.userSellId = :uid',
			{
			  replacements: {uid: req.user.id},
			  type: QueryTypes.SELECT
			}
		  );

		  res.status(200).send(out);

	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.show_history_one_get = async (req, res, next) => {
	try {
		
		const out = await sequelize.query(
			'select orders.id, orders.createdAt, users.email as buyEmail, us.email as sellEmail, pictures.name, pictures.description, pictures.year, pictures.type, pictures.price, pictures.width, pictures.height from orders inner join users on orders.userBuyId = users.id join users us on orders.userSellId = us.id inner join pictures on orders.pictureId = pictures.id where (orders.userBuyId = :uid or orders.userSellId = :uid) and orders.id = :oid',
			{
			  replacements: {uid: req.user.id, oid: req.params.id },
			  type: QueryTypes.SELECT
			}
		  );

		  res.status(200).send(out);

	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}