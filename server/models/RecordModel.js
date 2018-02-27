/**
 * Created by eatong on 18-2-12.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Channel = require('./ChannelModel');

const Record = sequelize.define('record', {
  date: Sequelize.DATEONLY,
  channel_id: Sequelize.INTEGER,
  clue: Sequelize.INTEGER,
  zztx: Sequelize.INTEGER,
  yzz: Sequelize.INTEGER,
  consume: Sequelize.INTEGER,
  contract: Sequelize.INTEGER,
  year: Sequelize.INTEGER,
  month: Sequelize.INTEGER,
  week: Sequelize.INTEGER,
  weekday: Sequelize.INTEGER,
  day: Sequelize.INTEGER,
});

Channel.hasMany(Record, {foreignKey: 'channel_id'});
Record.belongsTo(Channel, {foreignKey: 'channel_id'});
module.exports = Record;

