'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    userId: {
      type: DataTypes.INTEGER,
			allowNull: false,
    },
    userBuyId: {
      type: DataTypes.INTEGER,
			allowNull: false,
    },
    userSellId: {
      type: DataTypes.INTEGER,
			allowNull: false,
    },
    pictureName: {
      type: DataTypes.STRING,
			allowNull: false,
    },
    pictureImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};