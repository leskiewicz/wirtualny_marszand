'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {

    static afterDate() {
        var date = new Date();
        date.setFullYear(date.getFullYear()-16);
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId'});
    }
  };
  UserInfo.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
					args: [2, 60],
					msg: "Imie musi składać się od 2 do 60 znaków"
				}
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
					args: [2, 60],
					msg: "Nazwisko musi składać się od 2 do 60 znaków"
				}
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
					args: [2, 120],
					msg: "Nazwa miasta musi mieć więcej niż 2 znaki oraz mniej niż 120 znaków"
				}
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
					args: [10, 250],
					msg: "Adres musi mieć więcej niż 10 znaków oraz mniej niż 250 znaków"
				}
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [9,9],
                    msg: "Telefon musi mieć 9 cyfr"
                }
            }
        },
		birthDate: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
                isDate: {
                    args: true,
                    msg: "Proszę podać właściwą datę"
                },
			    isBefore: {
					args: UserInfo.afterDate(),
					msg: "Aby założyć konto musisz mieć przynajmniej 16 lat"
				}
			}
		},
        organisation: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
					args: [2, 120],
					msg: "Nazwa organizacji musi składać się od 2 do 120 znaków"
				}
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [2, 500],
                    msg: "Opis musi składać się od 2 do 500 znaków"
                }
            }
        }
  }, {
    sequelize,
    modelName: 'UserInfo',
  });
  return UserInfo;
};