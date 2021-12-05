require('dotenv').config();

const { User, Role } = require('../models')

const sequelizeErrorHandler = require('../sequelizeErrorHandler');
const jwt = require('jsonwebtoken');

module.exports.register_post = async(req, res) => {

	try {
		const user = User.build({ email: req.body.email, password: req.body.password })

		const role = await Role.findOne({
			where: {
				name: "KLIENT"
			}
		})
		
		console.log(role);
		
		await user.setRole(role)
		await role.setUser(user);

		//console.log(user);

		await user.save();
		res.send({"message": "Utworzono użytkownika."})
	} catch(err) {
		res.send(sequelizeErrorHandler(err))
	}

}

module.exports.login_post = async (req, res, next) => { 
	const user = await User.findOne({ 
		where: {
			email: req.body.email,
			password: req.body.password
		}
	});

	if(!user) {
		res.send({error: "Nie znaleziono uzytkownika"});
	} else {
		let payload = { id: user.id };
		let token = jwt.sign(payload, process.env.SECRET);
		res.send({ msg: 'ok', token: token });
	}
}

module.exports.token_test = async (req, res, next) => { 
	res.json(req.user);
}
