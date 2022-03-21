'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('UserInfos', {
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
          min: {
            args: 16,
            msg: "Aby założyć konto musisz mieć przynajmniej 16 lat"
          },
          max: {
            args: 120,
            msg: "Musisz mieć mniej niż 120 lat"
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
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: true
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
    await queryInterface.dropTable('UserInfos');
  }
};