'use strict';

const express = require('express');
const {
  RegisterUserForEvent,
  CreateUser,
  CreateRegistration,
  GetUsers,
  GetRegistrations,
} = require('../../handlers/registration');

// routerUsers: manages users of an org
const routerEventRegistration = express.Router();
routerEventRegistration.post('/register', RegisterUserForEvent);
routerEventRegistration.post('/user', CreateUser);
routerEventRegistration.get('/user', GetUsers);
routerEventRegistration.post('/registration', CreateRegistration);
routerEventRegistration.get('/registration', GetRegistrations);

exports.routerEventRegistration = routerEventRegistration;
