'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'users',
      [
        {
          uuid: 'c35c5e42-70d4-420b-9eec-60f7b0270623',
          name: 'Sarthak Joshi',
          email: 'sarthak@ajapayog.org',
          phone: '+91 7397380412',
          address: 'UCIL Colony, Jamshedpur, JH-832107',
          createdAt: '2022-05-08T14:07:17.747Z',
          updatedAt: '2022-05-08T14:07:17.747Z',
        },
        {
          uuid: 'f9a26d0d-b6ba-4194-9efe-9b33f6557c02',
          name: 'Tushar Sharma',
          email: 'tushar@ajapayog.org',
          phone: '+91 8864312144',
          address: 'Delhi, India',
          createdAt: '2022-05-08T14:07:17.747Z',
          updatedAt: '2022-05-08T14:07:17.747Z',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
