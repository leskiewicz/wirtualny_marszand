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

    await queryInterface.bulkInsert('Roles', [
    {
      name: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'ARTYSTA',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'HOTEL',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'KLIENT',
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
     await queryInterface.bulkDelete('Roles', null, {});
  }
};
