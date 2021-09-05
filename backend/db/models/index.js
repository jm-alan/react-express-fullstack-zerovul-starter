'use strict';

const Sequelize = require('sequelize');
const config = require('../../config/database');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {
  User: require('./user')(sequelize, Sequelize),
  sequelize,
  Sequelize
};

module.exports = db;
