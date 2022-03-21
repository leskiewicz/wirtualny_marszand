require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');

const {User, Role, Picture, sequelize, Order, Transaction } = require('../models')

const { QueryTypes } = require('sequelize');

const sequelizeErrorHandler = require('../sequelizeErrorHandler');

module.exports.buy_artist_picture_post = async (req, res, next) => {

	try {

		const picture = await Picture.findOne({
			where: { id: req.params.id }
		})

		if(!picture) {
			return res.send("Taki obraz nie istnieje");
		} 

		if(req.user.id == picture.userId) {
			return res.send("Nie możesz kupić obrazu od samego siebie");
		}

		if(!picture.onSale) {
			return res.send("Obraz nie jest dostępny do zakupu");
		}

		if(!picture.available) {
			return res.send("Obraz został już sprzedany");
		}

		const user = await picture.getUser({ attributes: {exclude: ['password']} });

		if(user.roleId != 2) {
			return res.status(404).send({ msg: "Nie możesz kupić obrazu od osoby, która nie jest artystą."});
		}

		const picOwner = await User.findOne({ where: { id: picture.userId } }); 
		const me = await User.findOne({ where: { id: req.user.id } });

		if(me.accountBalance < picture.price) {
			return res.send(404).send({ msg: "Nie masz pieniędzy, żeby zakupić ten obraz" });
		}

		const order = await Order.create({ userBuyId: req.user.id, userSellId: user.id, pictureId: picture.id})
		
		await order.save();
		picture.available = false;
		picture.onSale = false;
		await picture.save();
		
		picOwner.accountBalance = (picOwner.accountBalance+picture.price)
		me.accountBalance = (me.accountBalance-picture.price)

		await picOwner.save({ fields: ['accountBalance'] })
		await me.save({ fields: ['accountBalance'] })

		const transaction1 = await Transaction.create({ userId: me.id, userBuyId: me.id, userSellId: picOwner.id, pictureName: picture.name, pictureImage: picture.imageLocation, price: picture.price, type: "KUPIONO" });
		const transaction2 = await Transaction.create({ userId: picOwner.id, userBuyId: picOwner.id, userSellId: me.id, pictureName: picture.name, pictureImage: picture.imageLocation, price: picture.price, type: "SPRZEDANO" });
		await transaction1.save();
		await transaction2.save();

		const boughtPic = await Picture.create({ name: picture.name, imageLocation: picture.imageLocation, description: picture.description, year: picture.year, type: picture.type, price: picture.price, width: picture.width, height: picture.height, qrCodeLocation: null, percentage: picture.percentage, firstOwnerId: picture.firstOwnerId, userId: req.user.id });
		await boughtPic.save();

		const uuid = uuidv4();
		const qrLocation = 'qrcodes/'+ uuid +'.png';
		const qrLocationFile = process.env.SERVER_NAME + qrLocation;
		//'http://localhost:3000/artysta/galleries/me/' + + '/pictures/:id'
		//const envHost = "http://localhost:3000/"

		const fullLink = process.env.SERVER_NAME + 'klient/shop/pictures/' + boughtPic.id;

		qr.toFile('public/' + qrLocation, fullLink, (err) => {
			if(err) {
				res.status(404).send({msg: "Nie udalo sie zapisac qrCode"});
			}
		})

		boughtPic.qrCodeLocation = qrLocationFile;

		await boughtPic.save({ fields: ['qrCodeLocation'] })

		res.status(200).send({msg: "Zakupiono obraz"});

	} catch(err) {
		res.send(err)
		//res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.all_pictures_get = async (req, res, next) => {
	try {
		const pictures = await Picture.findAll({ where: { userId: req.user.id } });
		return res.status(200).send(pictures);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.one_picture_get = async (req, res, next) => {
	try {
		const picture = await Picture.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!picture) {
			return res.status(404).send({msg: "Taki obraz nie istnieje lub nie masz do niego dostępu."});
		}

		return res.status(200).send(picture);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
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

		if(!req.body.additionalPrice) {
			return res.status(404).send({msg: "Należy podać dodatkową cenę obrazu"});
		}

		picture.onSale = true;
		picture.additionalPrice = req.body.additionalPrice;
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
		res.send(err)
		//return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.all_pictures_shop_get = async (req, res, next) => {
	try {

		const pictures = await Picture.findAll({
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
		where: { available: true, onSale: true }
		});

		return res.status(200).send(pictures);
	} catch(err) {
		//res.send(err)
		return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.one_picture_shop_get = async (req, res, next) => {
	try {
		const picture = await Picture.findOne({
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
		where: { id: req.params.id, available: true, onSale: true }
		});

		if(!picture) {
			return res.status(404).send({msg: "Taki obraz nie istnieje lub nie masz do niego dostępu."});
		}

		return res.status(200).send(picture);
	} catch(err) {
		res.send(err)
		//return res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.show_history_get = async (req, res, next) => {
	try {
		
		const out = await sequelize.query(
			'select users.email as buyEmail, us.email as sellEmail, transactions.createdAt, transactions.pictureName, transactions.pictureImage, transactions.price, transactions.type from transactions inner join users on transactions.userBuyId = users.id join users us on transactions.userSellId = us.id where transactions.userId = :id',
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
			'select users.email as buyEmail, us.email as sellEmail, transactions.createdAt, transactions.pictureName, transactions.pictureImage, transactions.price, transactions.type from transactions inner join users on transactions.userBuyId = users.id join users us on transactions.userSellId = us.id where transactions.userId = :id and transactions.id = :tid',
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