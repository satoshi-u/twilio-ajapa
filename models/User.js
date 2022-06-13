'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Registration }) {
      // define association here
      this.hasMany(Registration, {
        foreignKey: 'userId',
        as: 'registration',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'name must not be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have an email' },
          notEmpty: { msg: 'email must not be empty' },
          isEmail: { msg: 'email must be a valid email address' },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a phone no.' },
          notEmpty: { msg: 'phone no. must not be empty' },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have an address' },
          notEmpty: { msg: 'address must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'user',
      modelName: 'User',
    }
  );
  return User;
};
