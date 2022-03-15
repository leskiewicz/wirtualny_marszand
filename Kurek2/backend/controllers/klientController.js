require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');

const { QueryTypes } = require('sequelize');

const {User, Role, Picture, Order, sequelize, Transaction } = require('../models')

const sequelizeErrorHandler = require('../sequelizeErrorHandler');

function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

module.exports.sample_post = async (req, res, next) => { 
	res.json(req.user);
}


module.exports.buy_hotel_picture_post = async (req, res, next) => {

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

		if(user.roleId != 3) {
			return res.status(404).send({ msg: "Nie możesz kupić obrazu od osoby, która nie jest hotelem."});
		}

		const firstPicOwner = await User.findOne({ where: { id: picture.firstOwnerId } })
		const hotelOwner = await User.findOne({ where: { id: picture.userId } }); 
		const me = await User.findOne({ where: { id: req.user.id } });

		if(me.accountBalance < (picture.price+picture.additionalPrice)) {
			return res.status(404).send({ msg: "Nie masz pieniędzy, żeby zakupić ten obraz" });
		}

		const order = await Order.create({ userBuyId: req.user.id, userSellId: user.id, pictureId: picture.id})
		
		await order.save();
		picture.available = false;
		picture.onSale = false;
		await picture.save();
	
		const moneyForPicture = picture.price+picture.additionalPrice
		const moneyForFirstOwner = round(picture.additionalPrice*(picture.percentage/100));
		const moneyForHotel = picture.price+(picture.additionalPrice-moneyForFirstOwner);

		me.accountBalance -= moneyForPicture;
		firstPicOwner.accountBalance += moneyForFirstOwner;
		hotelOwner.accountBalance += moneyForHotel;

		await hotelOwner.save({ fields: ['accountBalance'] })
		await me.save({ fields: ['accountBalance'] })
		await firstPicOwner.save({ fields: ['accountBalance'] })

		const transaction1 = await Transaction.create({ userId: me.id, userBuyId: me.id, userSellId: hotelOwner.id, pictureName: picture.name, pictureImage: picture.imageLocation, price: moneyForPicture, type: "KUPIONO" });
		const transaction2 = await Transaction.create({ userId: hotelOwner.id, userBuyId: me.id, userSellId: hotelOwner.id, pictureName: picture.name, pictureImage: picture.imageLocation, price: moneyForHotel, type: "SPRZEDANO" });
		const transaction3 = await Transaction.create({ userId: firstPicOwner.id, userBuyId: hotelOwner.id, userSellId: firstPicOwner.id, pictureName: picture.name, pictureImage: picture.imageLocation, price: moneyForFirstOwner, type: "PROWIZJA" });
		
		await transaction1.save();
		await transaction2.save();
		await transaction3.save();

		const boughtPic = await Picture.create({ name: picture.name, additionalPrice: picture.additionalPrice, imageLocation: picture.imageLocation, description: picture.description, year: picture.year, type: picture.type, price: picture.price, width: picture.width, height: picture.height, qrCodeLocation: null, percentage: picture.percentage, firstOwnerId: picture.firstOwnerId, userId: req.user.id });
		await boughtPic.save();
	
		return res.status(200).send({msg: "Zakupiono obraz"});

	} catch(err) {
		return res.send(err)
		//res.status(404).send(sequelizeErrorHandler(err));
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
				where: { "name": "HOTEL" }
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
				where: { "name": "HOTEL" }
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