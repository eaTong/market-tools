/**
 * Created by eatong on 18-2-20.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Menu = sequelize.define('menu', {
  path: {type: Sequelize.STRING, unique: true},
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
  enable: Sequelize.BOOLEAN,
});

module.exports = Menu;
