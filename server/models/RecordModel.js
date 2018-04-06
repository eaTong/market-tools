/**
 * Created by eatong on 18-2-12.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Channel = require('./ChannelModel');

const {getFlatFields} = require('../../public/recordConfig');
const recordDefine = {
  date: {type: Sequelize.DATEONLY, comment: '记录日期'},
  channel_id: {type: Sequelize.INTEGER, comment: ''},
  year: {type: Sequelize.INTEGER, comment: '年---辅助统计用'},
  month: {type: Sequelize.INTEGER, comment: '月---辅助统计用'},
  week: {type: Sequelize.INTEGER, comment: '周数---辅助统计用'},
  weekday: {type: Sequelize.INTEGER, comment: '星期---辅助统计用'},
  day: {type: Sequelize.INTEGER, comment: '日---辅助统计用'},
};
for (let field of getFlatFields(true)) {
  recordDefine[field.key] = {type: Sequelize.INTEGER, comment: field.name}
}

const Record = sequelize.define('record', recordDefine);

Channel.hasMany(Record, {foreignKey: 'channel_id'});
Record.belongsTo(Channel, {foreignKey: 'channel_id'});
module.exports = Record;

