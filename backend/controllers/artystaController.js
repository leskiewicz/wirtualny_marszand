require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');

const { Gallery, User, Role, Picture, sequelize } = require('../models')

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
		res.send({msg: "Utworzono nową galerię"});
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.all_galleries_me_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findAll({ where: { userId: req.user.id } });
		res.send(gallery);
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.new_picture_in_gallery = async (req, res, next) => {
	const uuid = uuidv4();
	const qrLocation = 'qrcodes/'+ uuid +'.png';

	const fullLink = "http://localhost/" + qrLocation;
	
	try {
		const file = req.file
		const imgLocation = 'pictures/' + file.filename;

		if (!file) {
			res.send({msg: "Nie podano obrazu"});
		}

		qr.toFile('public/' + qrLocation, fullLink, (err) => {
			if(err) {
				res.send({msg: "Nie udalo sie zapisac qrCode"});
			}
		})

		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.send({msg: "Taka galeria nie istnieje"});
		}
		
		if(gallery.userId != req.user.id) {
			res.send({msg: "Nie możesz dodawać obrazów do nie swojej galerii"});
		} else {
			const picture = await Picture.create({ name: req.body.name, imageLocation: imgLocation, description: req.body.description, year: req.body.year, type: req.body.type, price: req.body.price, width: req.body.width, height: req.body.height, qrCodeLocation: qrLocation});
			
			await picture.setGallery(gallery);
			await gallery.addPicture(picture);
		
			await picture.save();
			res.send({msg: "Dodano nowy obraz do galerii"});
		}
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.one_gallery_by_id_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.send({msg: "Taka galeria nie istnieje"});
		}

		res.send(gallery);
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.all_images_from_gallery_by_id_get = async (req, res, next) => {
	try {

		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.send({msg: "Taka galeria nie istnieje"});
		}

		const pictures = await Picture.findAll({ where: { galleryId: req.params.id } });
		res.send(pictures);
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}

module.exports.single_picture_get = async (req, res, next) => {
	try {
		const gallery = await Gallery.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!gallery) {
			res.send({msg: "Taka galeria nie istnieje"});
		}

		const picture = await Picture.findOne({ where: {galleryId: req.params.id, id: req.params.pid }})
		res.send(picture);
	} catch(err) {
		res.send(sequelizeErrorHandler(err));
	}
}