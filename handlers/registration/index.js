'use strict';

// @ts-ignore
const { User, Registration } = require('../../models');

// RegisterUser : Registers user IN DB (TEST)
exports.CreateUser = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const user = await User.create({ name, email, phone, address });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GetUsers : Gets all users from user table
exports.GetUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: 'registration' });
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// CreateRegistration : creates dummy Registration from fields coming in req.body
exports.CreateRegistration = async (req, res) => {
  const {
    userUUID,
    eventOption,
    arrivalDate,
    arrivalTime,
    arrivalTransport,
    departureDate,
    departureTime,
    departureTransport,
  } = req.body;
  const user = await User.findOne({ where: { uuid: userUUID } });
  console.log('user fetched : ', user);
  try {
    const registration = await Registration.create({
      userId: user.id,
      eventOption,
      arrivalDate,
      arrivalTime,
      arrivalTransport,
      departureDate,
      departureTime,
      departureTransport,
    });
    return res.json(registration);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GetRegistrations : Gets all registrations from registration table
exports.GetRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      // include: [User],
      // include: [{ model: User, as: 'user' }],
      // include: ['user'],
      include: 'user', // without array, just one
    });
    return res.json(registrations);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// RegisterUserForEvent : Registers user for event
exports.RegisterUserForEvent = async (req, res) => {
  const {
    phone,
    eventOption,
    arrivalDate,
    arrivalTime,
    arrivalTransport,
    departureDate,
    departureTime,
    departureTransport,
  } = req.body;
  try {
    // 1. Check if the user exists. if not, error out
    const user = await User.findOne({ where: { phone } });
    console.log('user fetched : ', user);
    // 2. Create & Insert the registration event in "database" with association to user
    const registration = await Registration.create({
      userId: user.id,
      eventOption,
      arrivalDate,
      arrivalTime,
      arrivalTransport,
      departureDate,
      departureTime,
      departureTransport,
    });
    // 3. Return success msg in response
    res.send({
      message: 'User registered for event successfully!',
      registration,
    });
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
