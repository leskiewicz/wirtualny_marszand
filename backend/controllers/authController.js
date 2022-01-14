require('dotenv').config();
const { User, UserInfo, Role, sequelize } = require('../models')

const sequelizeErrorHandler = require('../sequelizeErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.register_post = async(req, res) => {

	try {

		/*
		if(req.body.password != req.body.repassword) {
			res.send({message: "Hasla sie nie zgadzają"});
		}
		*/
		
		const result = await sequelize.transaction(async (t) => {
			
			const user = await User.create({ email: req.body.email, password: req.body.password }, { transaction: t })

			const userInfo = await UserInfo.create({ firstName: req.body.firstName, lastName: req.body.lastName,  city: req.body.city,
				address: req.body.address, age: req.body.age, organisation: req.body.organisation, description: req.body.description, phone: req.body.phone, birthDate: req.body.birthDate});
			
			const role = await Role.findOne({
				where: {
					name: "KLIENT"
				}
			}, { transaction: t});

			await user.setRole(role, { transaction: t });

			await user.setUserInfo(userInfo, { transaction: t });

			await userInfo.setUser(user, { transaction: t });

			await role.addUser(user, { transaction: t });

			return user;
		
		  });
		
		res.status(200).send({message: "Utworzono użytkownika."})
	} catch(err) {
		res.send(sequelizeErrorHandler(err))
	}

}

module.exports.login_post = async (req, res, next) => { 
	const user = await User.findOne({ 
		where: {
			email: req.body.email,
		}
	});

	console.log(user);
	
	if(!user) {
		res.send({error: "Nie znaleziono uzytkownika"});
	} else {
		const userValidate = await bcrypt.compare(req.body.password, user.password);
		if(userValidate) {
			let payload = { id: user.id };
			let token = jwt.sign(payload, process.env.SECRET);
			res.status(200).send({ msg: 'ok', token: token });
		} else {
			res.send({error: "Nieprawidlowe haslo"})
		}
	}
}

module.exports.token_test = async (req, res, next) => { 
	res.json(req.user);
}