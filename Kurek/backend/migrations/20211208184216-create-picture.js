'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      imageLocation: { 
        type: DataTypes.STRING,
        allowNull: false 
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
      qrCodeLocation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      galleryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pictures');
  }
};