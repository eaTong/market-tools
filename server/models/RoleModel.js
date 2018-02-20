/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Role = sequelize.define('role', {
  name: Sequelize.STRING,
  remark: Sequelize.STRING,
  enable: Sequelize.BOOLEAN,
});


module.exports = Role;
