/**
 * Created by eatong on 18-3-2.
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Trial = sequelize.define('trial', {
  company: Sequelize.STRING,
  telephone: Sequelize.STRING,
  email: Sequelize.STRING,
  contact: Sequelize.STRING,
  address: Sequelize.STRING,
  count: Sequelize.STRING,
  handled: Sequelize.BOOLEAN,
});

module.exports = Trial;
