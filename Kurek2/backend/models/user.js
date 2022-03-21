'use strict';

const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Picture, Role, UserInfo, Order }) {
      // define association here
      this.belongsTo(Role, { foreignKey: 'roleId'});
	  this.hasOne(UserInfo, { foreignKey: 'userId'});
	  //this.hasMany(Gallery, { foreignKey: 'userId'});
	  this.hasMany(Picture, { foreignKey: 'userId'});
	  //this.hasMany(Order, { foreignKey: 'userId'});
    }
  };
  User.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: 'email',
				msg: "Użytkownik o takim adresie email już istnieje"
			},
			validate: {
				isEmail: {
					args: true,
					msg: "Proszę podać prawidłowy adres email"
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [6, 32],
					msg: "Hasło musi składać się od 6 do 32 znaków"
				}
			}
		},
		accountBalance: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			validate: {
				isDecimal: {
					msg: "Pieniędze na koncie decimal"
				}
			}
		},
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeSave', 'hashPassword', async (user) => {
	const hash = await bcrypt.hash(user.password, 10);
	user.password = hash
  });

  return User;
};