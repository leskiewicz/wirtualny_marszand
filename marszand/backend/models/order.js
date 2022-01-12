'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Picture }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId'} );
      this.belongsTo(Picture, { foreignKey: 'pictureId'});
    }
  };
  Order.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    userId: {
      type: DataTypes.INTEGER,
			allowNull: false,
    },
    pictureId: {
      type: DataTypes.INTEGER,
			allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};