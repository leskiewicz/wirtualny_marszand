'use strict';
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
    static associate({ Role }) {
      // define association here
      this.belongsTo(Role, { foreignKey: 'roleId'});
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
				args: true,
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
		}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};