/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const Record = require('../models/RecordModel');
const Channel = require('../models/ChannelModel');

class RecordService extends BaseService {

  static async addRecord(record) {
    record.password = md5(record.password).toString();
    record.enable = true;
    return await Record.create(record);
  }

  static async updateRecords(data) {
    await Record.destroy({where: {date: {[Op.eq]: data.date}}});
    const records = [];
    for (let record of data.records) {
      records.push({...record, date: data.date});
    }
    return await Record.bulkCreate(records);
  }

  static async deleteRecords(ids) {
    return await Record.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getRecords() {
    return await Record.findAll({include: {model: Channel}});
  }
}

module.exports = RecordService;


// RecordService.addRecord({name: 'eaTong', account: '15284412582', password: 'eatong123'})
// RecordService.updateRecords({name: 'eaTong', account: '18288757143', id: 5})
// RecordService.deleteRecords([21]);


/*(async () => {
  const data = {
    records:
      [
        {clue: 12, zztx: 2, yzz: 3, consume: 0, channel_id: '2'},
        {clue: 12, zztx: 2, yzz: 4, consume: 0, channel_id: '3'}
      ],
    date: '2018-02-13'
  };
  // const records = await RecordService.updateRecords(data);
  // console.log(records.toString())
  await RecordService.getRecords();
})();*/

