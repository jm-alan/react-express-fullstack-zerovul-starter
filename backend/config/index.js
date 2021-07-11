const { resolve } = require('path');
const { config } = require('dotenv');
config(resolve('../.env'));

const {
  PORTS,
  PORT,
  FROGGY: username,
  FRESH: password,
  KRISPY: database,
  KREME: host,
  SECRET: secret,
  EXPIRES: expiresIn,
  environment
} = process.env;

module.exports = {
  ports: (PORTS && JSON.parse(PORTS)) || [PORT],
  db: { username, password, database, host },
  jwtConfig: { secret, expiresIn: parseInt(expiresIn) },
  environment
};
