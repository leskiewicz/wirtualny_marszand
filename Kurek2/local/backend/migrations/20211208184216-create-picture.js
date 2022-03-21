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
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Pole name nie może być puste"
          }
        }
      },
      imageLocation: { 
        type: DataTypes.STRING,
        allowNull: false 
      },
      description: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Pole description nie może być puste"
          }
        }
      },
      year: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Rok musi być liczbą całkowitą"
          },
          min: {
            args: 1,
            msg: "Rok musi byc większy lub równy 1"
          },
          max: {
            args: new Date().getFullYear(),
            msg: "Rok musi być mniejszy lub równy " + new Date().getFullYear()
          }
        }        
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Pole type nie może być puste"
          }
        }
      },
      price: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Pole price musi byc liczbą dziesiętną"
          }
        }
      },
      width: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Pole width musi byc liczbą dziesiętną"
          }
        }
      },
      height: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Pole height musi byc liczbą dziesiętną"
          }
        }
      },
      qrCodeLocation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      percentage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "Pole percentage musi byc liczbą dziesiętną"
          },
          min: {
            args: 1,
            msg: "Pole percentage musi byc większe lub równe 1"
          },
          max: {
            args: 100,
            msg: "Pole percentage musi być mniejsze lub równe 100"
          }
        }
      },
      onSale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      additionalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: {
            msg: "Pole additionalPrice musi byc liczbą dziesiętną"
          }
        }
      },
      firstOwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false
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