require('dotenv').config();
const qr = require("qrcode");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const { User, Role, UserInfo, sequelize } = require('../models')

const sequelizeErrorHandler = require('../sequelizeErrorHandler');

module.exports.my_informations_get = async (req, res, next) => {
	try {
		const user = await User.findOne({
			attributes: {exclude: ['password']},
			include: [{
				model: UserInfo,
				required: true,
			},
			{
				model: Role,
				required: true,
				attributes: {exclude: ['createdAt', 'updatedAt']}
			}
			],
			where: { id: req.user.id }
		})

		res.status(200).send(user);
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.update_password_post = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.user.id }
		})

		const userValidate = await bcrypt.compare(req.body.password, user.password);
		if(userValidate) {
			if(req.body.newpassword == req.body.renewpassword) {

				user.password = req.body.newpassword;
				await user.save({ fields: ['password'] });

				res.status(200).send({msg: "Sukces, hasło zmienione"});
			} else {
				res.status(404).send({msg: "Hasła się nie zgadzają"});
			}
		} else {
			res.status(404).send({msg: "Podano nieprawidłowe hasło do konta"});
		}
	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}

module.exports.update_user_post = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.user.id }
		})

		user.email = req.body.email;

		const userInfo = await UserInfo.findOne({
			where: { userId: req.user.id }
		});

		userInfo.firstName = req.body.firstName;
		userInfo.lastName = req.body.lastName;
		userInfo.city = req.body.city;
		userInfo.address = req.body.address;
		userInfo.organisation = req.body.organisation;
		userInfo.description = req.body.description;
		userInfo.phone = req.body.phone;
		userInfo.birthDate = req.body.birthDate;

		await user.save({ fields: ['email'] });
		await userInfo.save();
		
		res.status(200).send({ msg: "Udalo sie uaktualnic dane" });

	} catch(err) {
		res.status(404).send(sequelizeErrorHandler(err));
	}
}
