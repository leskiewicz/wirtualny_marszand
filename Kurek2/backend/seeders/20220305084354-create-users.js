'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Users', [
      {
        email: 'klient@gmail.com',
        password: '$2a$10$1jF5ZlXCUQCOyGZ1qF/fPud/HV.k/Z5zc8rCwrP/QLEnp.V4Klct2', //klientklient
        accountBalance: 1000.00,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'artysta@gmail.com',
        password: '$2a$10$XOZW7y.YMuPOrddZUA5W3eKI7eztlEg8pqvNOjrBCTnhkyVzCaQeS', //artystaartysta
        accountBalance: 1000.00,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'hotel@gmail.com',
        password: '$2a$10$ATNIAWRDEJ5Ic7S/QR4wRO25EMAvd6g6QmSMXZG2krYxNJTVhpKW.', //hotelhotel
        accountBalance: 1000.00,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
