/**
 * Created by eatong on 18-2-12.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Record = sequelize.define('record', {
  date: Sequelize.DATEONLY,
  channel_id: Sequelize.Integer,
  clue: Sequelize.Integer,
  zztx: Sequelize.Integer,
  yzz: Sequelize.Integer,
  consume: Sequelize.Integer,
  contract: Sequelize.Integer
});


module.exports = Record;
