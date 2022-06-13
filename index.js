'use strict';

// use this to set logging, must be set before the require('fabric-network');
// process.env.HFC_LOGGING = '{"debug": "./debug.log"}';
const http = require('http');
const express = require('express');
const cors = require('cors');
// @ts-ignore
require('dotenv/config');
const cookieParser = require('cookie-parser');
const { routerEventRegistration } = require('./routers/registration');
const { sequelize } = require('./models');
const ngrok = require('ngrok');

// sleep for (s *1000) seconds
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// MAIN
// npm run start
async function main() {
  console.log(`************ START ************`);
  const PORT = 4001;
  const registerForAjapaEventApp = express();
  registerForAjapaEventApp.use(express.json());
  registerForAjapaEventApp.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  registerForAjapaEventApp.use(cookieParser());
  registerForAjapaEventApp.use(
    express.urlencoded({ extended: true })
  ); // to support URL-encoded bodies
  registerForAjapaEventApp.use('/', routerEventRegistration);
  const registerForAjapaEventServer = http.createServer(
    registerForAjapaEventApp
  );
  registerForAjapaEventServer.listen(PORT, async function () {
    console.log(`Listening on port ${PORT}...`);
    await sequelize.authenticate();
    console.log('Connection has been established successfully...');
    console.log(
      `************ registerForAjapaEventApp Up ************`
    );
  });

  const url = await ngrok.connect(PORT); // https://757c1652.ngrok.io -> http://localhost:9090
  console.log('hosted at : ', url);

  // Close app after 10h
  await sleep(100 * 60 * 60 * 1000);
  console.log(`************ END ************`);
  process.exit(0);
}

main();
