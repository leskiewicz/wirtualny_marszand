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
    static associate({ User, Order }) {
      this.belongsTo(User);
      this.hasOne(Order);
    }
  };
  Picture.init({
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
    qrCodeLocation: {
      type: DataTypes.STRING,
      allowNull: true
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
          args: 0.01,
          msg: "Pole percentage musi byc większe lub równe 0.01"
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
    }
  }, {
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};