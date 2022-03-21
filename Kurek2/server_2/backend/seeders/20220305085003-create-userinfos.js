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

     await queryInterface.bulkInsert('UserInfos', [
      {
        firstName: 'Aleksander',
        lastName: 'Nowak',
        city: 'Szczecin',
        address: 'Ul. Brzozowa 20',
        phone: '111222333',
        birthDate: '2000-01-01 00:00:00',
        organisation: 'ZUT',
        description: 'Opis klienta.',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Adam',
        lastName: 'Kowalski',
        city: 'Szczecin',
        address: 'Ul. Portowa 10',
        phone: '333222111',
        birthDate: '2000-01-01 00:00:00',
        organisation: 'ASP',
        description: 'Opis artysty.',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Wiktor',
        lastName: 'Buk',
        city: 'Szczecin',
        address: 'Ul. Wawrzyniaka 30',
        phone: '666222111',
        birthDate: '2000-01-01 00:00:00',
        organisation: 'HOTEL',
        description: 'Opis hotelu.',
        userId: 3,
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
     await queryInterface.bulkDelete('UserInfos', null, {});
  }
};
