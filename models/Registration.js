'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // FK default: <model-name> + <primary-key> : Userid
      // change it to userId

      // this.belongsTo(User, { foreignKey: 'userId' }); // works with -> Registration.findAll({include: [User]})

      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
      }); // works with -> Registration.findAll({include: ['user']}) & Registration.findAll({include: [{ model: User, as: 'user' }]})
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Registration.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      eventOption: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Registration must have associated eventOption',
          },
          notEmpty: { msg: 'eventOption must not be empty' },
        },
      },
      arrivalDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Registration must have an arrivalDate' },
          notEmpty: { msg: 'arrivalDate must not be empty' },
        },
      },
      arrivalTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Registration must have an arrivalTime' },
          notEmpty: { msg: 'arrivalTime must not be empty' },
        },
      },
      arrivalTransport: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Registration must have an arrivalTransport',
          },
          notEmpty: { msg: 'arrivalTransport must not be empty' },
        },
      },
      departureDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Registration must have a departureDate' },
          notEmpty: { msg: 'departureDate must not be empty' },
        },
      },
      departureTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Registration must have a departureTime' },
          notEmpty: { msg: 'departureTime must not be empty' },
        },
      },
      departureTransport: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Registration must have a departureTransport',
          },
          notEmpty: { msg: 'departureTransport must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'registration',
      modelName: 'Registration',
    }
  );
  return Registration;
};
