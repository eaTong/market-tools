/**
 * Created by eatong on 18-2-12.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Channel = require('./ChannelModel');

const Record = sequelize.define('record', {
  date: {type: Sequelize.DATEONLY, comment: '记录日期'},
  channel_id: {type: Sequelize.INTEGER, comment: ''},
  clue: {type: Sequelize.INTEGER, comment: '线索量'},
  zztx: {type: Sequelize.INTEGER, comment: '智装天下转单量'},
  yzz: {type: Sequelize.INTEGER, comment: '云智装转单量'},
  consume: {type: Sequelize.INTEGER, comment: '花费金额'},
  contract: {type: Sequelize.INTEGER, comment: '签单总金额'},

  contract_count_zztx: {type: Sequelize.INTEGER, comment: '智装天下签单数'},
  contract_count_yzz: {type: Sequelize.INTEGER, comment: '智装天下签单数'},
  contract_zztx: {type: Sequelize.INTEGER, comment: '智装天下签单金额'},
  contract_yzz: {type: Sequelize.INTEGER, comment: '云智装签单金额'},
  year: {type: Sequelize.INTEGER, comment: '年---辅助统计用'},
  month: {type: Sequelize.INTEGER, comment: '月---辅助统计用'},
  week: {type: Sequelize.INTEGER, comment: '周数---辅助统计用'},
  weekday: {type: Sequelize.INTEGER, comment: '星期---辅助统计用'},
  day: {type: Sequelize.INTEGER, comment: '日---辅助统计用'},
});

Channel.hasMany(Record, {foreignKey: 'channel_id'});
Record.belongsTo(Channel, {foreignKey: 'channel_id'});
module.exports = Record;

