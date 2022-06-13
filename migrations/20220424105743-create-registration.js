'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('registration', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      eventOption: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      arrivalDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalTransport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTransport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('registration');
  },
};
