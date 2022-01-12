'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Gallery, Order }) {
      this.belongsTo(Gallery);
      this.hasOne(Order);
    }
  };
  Picture.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qrCodeLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    width: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    height: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};