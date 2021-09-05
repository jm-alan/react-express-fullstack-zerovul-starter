const { resolve } = require('path');
if (process.env.NODE_ENV === 'development') require('dotenv').config(resolve('../.env'));

const {
  PORTS,
  PORT,
  DB_USER: username,
  DB_PASS: password,
  DB_NAME: database,
  DB_HOST: host,
  SECRET: secret,
  EXPIRES: expiresIn,
  NODE_ENV: environment = 'development'
} = process.env;

module.exports = {
  ports: (PORTS && JSON.parse(PORTS)) || [PORT],
  db: { username, password, database, host },
  jwtConfig: { secret, expiresIn: parseInt(expiresIn) },
  environment
};
