/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const sequelize = require('sequelize');
const BaseService = require('../framework/BaseService');
const Record = require('../models/RecordModel');
const Channel = require('../models/ChannelModel');

const {Op} = sequelize;

class RecordService extends BaseService {

  static async addRecord(record) {
    record.password = md5(record.password).toString();
    record.enable = true;
    return await Record.create(record);
  }

  static async updateRecords(data) {
    const date = data.date.split('-');
    await Record.destroy({where: {date: {[Op.eq]: data.date}}});
    const records = [];
    for (let record of data.records) {
      records.push({
        ...record,
        date: data.date,
        year: date[0],
        month: date[1],
        day: date[2],
        week: data.week,
        weekday: data.weekday
      });
    }
    return await Record.bulkCreate(records);
  }

  static async deleteRecords(ids) {
    return await Record.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getRecords({startDate, endDate, calendarType}) {
    if (calendarType === 'month') {
      return await Record.findAll({where: {date: {[Op.between]: [startDate, endDate]}}, include: {model: Channel}});
    } else {
      // return [];
      return await Record.findAll({
        group: ['month'],
        attributes: [
          'month',
          [sequelize.fn('sum', sequelize.col('clue')), 'clue'],
          [sequelize.fn('sum', sequelize.col('yzz')), 'yzz'],
          [sequelize.fn('sum', sequelize.col('zztx')), 'zztx'],
          [sequelize.fn('sum', sequelize.col('consume')), 'consume'],
          [sequelize.fn('sum', sequelize.col('contract')), 'contract'],
          [sequelize.fn('sum', sequelize.col('contract_yzz')), 'contract_yzz'],
          [sequelize.fn('sum', sequelize.col('contract_zztx')), 'contract_zztx'],
        ],
        where: {date: {[Op.between]: [startDate, endDate]}}
      });
    }
  }

  static async getGroupedIntervalReport({startDate, endDate, channels}) {
    return await Record.findAll({
      group: ['date'],
      attributes: [
        'date',
        [sequelize.fn('sum', sequelize.col('clue')), 'clue'],
        [sequelize.fn('sum', sequelize.col('yzz')), 'yzz'],
        [sequelize.fn('sum', sequelize.col('zztx')), 'zztx'],
        [sequelize.fn('sum', sequelize.col('consume')), 'consume'],
        [sequelize.fn('sum', sequelize.col('contract')), 'contract'],
        [sequelize.fn('sum', sequelize.col('contract_yzz')), 'contract_yzz'],
        [sequelize.fn('sum', sequelize.col('contract_zztx')), 'contract_zztx'],
      ],
      where: {date: {[Op.between]: [startDate, endDate]}, channel_id: {[Op.in]: channels}},

    });
  }

  static async getIntervalReport({startDate, endDate, channels}) {
    const result = await Record.findAll({
      attributes: ['date', 'clue', 'yzz', 'zztx', 'consume', 'contract', 'contract_yzz', 'contract_zztx'],
      where: {date: {[Op.between]: [startDate, endDate]}, channel_id: {[Op.in]: channels}},
      include: {model: Channel, attributes: ['name']},
      order: [['date']]
    });
    return JSON.parse(JSON.stringify(result)).map(item => {
      return {...item, channel: item.channel.name}
    })
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
  const result = await RecordService.getRecords({startDate: '2018-02-01', endDate: '2018-02-28'});
  console.log(result);
})();*/

// RecordService.getRecords({startDate: '2018-01-01', endDate: '2018-12-31', calendarType: 'year'});
