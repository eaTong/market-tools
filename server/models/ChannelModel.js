/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Channel = sequelize.define('channel', {
  name: {type: Sequelize.STRING, unique: true},
  remark: Sequelize.STRING,
  enable: Sequelize.BOOLEAN,
});

module.exports = Channel;
