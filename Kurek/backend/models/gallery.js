'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Picture, User }) {
      // define association here
      this.hasMany(Picture, { foreignKey: 'galleryId'});
      this.belongsTo(User, { foreignKey: 'userId'});
    }
  };
  Gallery.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [6, 50],
					msg: "Nazwa galerii musi składać się od 6 do 32 znaków"
				}
			}
		}
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};