'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Transactions');
  }
};