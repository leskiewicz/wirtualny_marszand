require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const { QueryTypes } = require('sequelize');

const {User, Picture, sequelize, Order } = require('../models')

const sequelizeErrorHandler = require('../sequelizeErrorHandler');
const { privateDecrypt } = require('crypto');

module.exports.all_pictures_get = async (req, res, next) => {
	try {
		const pictures = await Picture.findAll({ where: { userId: req.user.id, available: true, onSale: false } });
		return res.status(200).send(pictures);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.one_picture_get = async (req, res, next) => {
	try {
		const picture = await Picture.findOne({ where: { id: req.params.id, available: true, onSale: false, userId: req.user.id } });

		if(!picture) {
			return res.status(404).send({msg: "Taki obraz nie istnieje lub nie masz do niego dostępu."});
		}

		return res.status(200).send(picture);
	} catch(err) {
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.new_picture_post = async (req, res, next) => {
	
	let fileLocation = '/public/';

	try {
		const file = req.file
		const imgLocation = process.env.SERVER_NAME + 'pictures/' + file.filename;

		fileLocation += 'pictures/' + file.filename

		console.log(file.filename)

		if (!file) {
			return res.status(404).send({msg: "Nie podano obrazu"});
		}
		
		const picture = await Picture.create({ name: req.body.name, imageLocation: imgLocation, description: req.body.description, year: req.body.year, type: req.body.type, price: req.body.price, width: req.body.width, height: req.body.height, qrCodeLocation: null, percentage: req.body.percentage, firstOwnerId: req.user.id });
		const user = await User.findOne({ where: {id: req.user.id} });
	
		await picture.setUser(user);
		await user.addPicture(picture);
		await picture.save();
		

		return res.status(200).send({msg: "Dodano nowy obraz"});

	} catch(err) {

		try {
			fs.unlinkSync(__basedir+fileLocation)
		  } catch(err) {}

		  try {
			return res.status(404).send(sequelizeErrorHandler(err));
		  } catch(err) {
			return res.status(404).send({ errors: { obraz: "Nie udało się wgrać obrazu" }});
		  }
	}
}

module.exports.picture_on_sale_post = async (req, res, next) => {
	
	try {

		const picture = await Picture.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!picture) {
			return res.status(404).send({msg: "Taki obraz nie istnieje lub nie masz do niego dostępu"});
		}

		if(!picture.available) {
			return res.status(404).send({msg: "Nie można wystawić na sprzedaż obrazu, który został już sprzedany."})
		}

		if(picture.onSale) {
			return res.status(404).send({msg: "Ten obraz jest już wystawiony na sprzedaż"});
		}

		picture.onSale = true;
		await picture.save()
		return res.send({ msg: "Wystawiono obraz na sprzedaż" });

	} catch(err) {
		//res.status(404).send(err)
		return res.status(404).send({msg: "Nie udało się wystawić obrazu na sprzedaz"});
	}

}

module.exports.all_pictures_sale_get = async (req, res, next) => {
	try {
		const pictures = await Picture.findAll({ where: { userId: req.user.id, onSale: true } });
		return res.status(200).send(pictures);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.one_picture_sale_get = async (req, res, next) => {
	try {
		const picture = await Picture.findOne({ where: { id: req.params.id, userId: req.user.id, onSale: true } });

		if(!picture) {
			return res.status(404).send({msg: "Taki obraz nie istnieje lub nie masz do niego dostępu."});
		}

		return res.status(200).send(picture);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.show_history_get = async (req, res, next) => {
	try {
		
		const out = await sequelize.query(
			'select transactions.id, users.email as buyEmail, us.email as sellEmail, transactions.createdAt, transactions.pictureName, transactions.pictureImage, transactions.price, transactions.type from transactions inner join users on transactions.userBuyId = users.id join users us on transactions.userSellId = us.id where transactions.userId = :id',
			{
			  replacements: {id: req.user.id},
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
			'select transactions.id, users.email as buyEmail, us.email as sellEmail, transactions.createdAt, transactions.pictureName, transactions.pictureImage, transactions.price, transactions.type from transactions inner join users on transactions.userBuyId = users.id join users us on transactions.userSellId = us.id where transactions.userId = :id and transactions.id = :tid',
			{
			  replacements: {id: req.user.id, tid: req.params.id },
			  type: QueryTypes.SELECT
			}
		  );

		  res.status(200).send(out);

	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.remove_sale_picture_post = async (req, res, next) => {
	try {

		const picture = await Picture.findOne({
			where: { id: req.params.id }
		})

		if(!picture) {
			return res.send({msg: "Taki obraz nie istnieje"});
		} 

		if(req.user.id != picture.userId) {
			return res.send({msg: "Nie możesz wycofać nieswojego obrazu"});
		}

		if(!picture.onSale) {
			return res.send({msg: "Nie możesz wycofać obrazu, który nie jest w sprzedaży"});
		}

		if(!picture.available) {
			return res.send({msg: "Nie możesz wycofać sprzedanego obrazu"});
		}

		picture.onSale = false;
		picture.save();
		return res.send({msg: "Wycofano obraz ze sprzedaży"})


	} catch(err) {
		return res.status(404).send({msg: "ERROR"})
	}

}

module.exports.all_archive_pictures_get = async (req, res, next) => {
	try {
		const pictures = await Picture.findAll({ where: { userId: req.user.id, available: false } });
		return res.status(200).send(pictures);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.one_archive_picture_get = async (req, res, next) => {
	try {
		const picture = await Picture.findOne({ where: { id: req.params.id, available: false, userId: req.user.id } });

		if(!picture) {
			return res.status(404).send({msg: "Taki obraz nie istnieje lub nie masz do niego dostępu."});
		}

		return res.status(200).send(picture);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.edit_picture_post = async(req, res, next) => {
	try {		

		const picture = await Picture.findOne({ where: { id: req.params.id } })

		if(!picture) {
			return res.status(404).send({msg: "Taki obraz nie istnieje lub nie masz do niego dostępu."});
		}

		if(picture.userId != req.user.id) {
			return res.status(404).send({msg: "Nie możesz edytować obrazu, który nie należy do ciebie"});
		}

		if(picture.onSale) {
			return res.status(404).send({msg: "Nie możesz edytować obrazu, który został wystawiony na sprzedaż"});
		}

		if(!picture.available) {
			return res.status(404).send({msg: "Nie możesz edytować sprzedanego obrazu"});
		}
		
		picture.name = req.body.name;
		picture.description = req.body.description;
		picture.year = req.body.year;
		picture.type = req.body.type;
		picture.price = req.body.price;
		picture.width = req.body.width;
		picture.height = req.body.height;
		picture.percentage = req.body.percentage;

		await picture.save();

		return res.status(200).send({msg: "Udało się edytować obraz"});

	} catch(err) {
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}