/**
 * Created by eatong on 18-2-10.
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const Channel = require('../models/ChannelModel');

class ChannelService extends BaseService {

  static async addChannel(channel) {
    channel.enable = true;
    return await Channel.create(channel);
  }

  static async updateChannels(data) {
    // return await Channel.findAll();
    return await Channel.update(data, {where: {id: data.id}, fields: ['name', 'account']})
  }

  static async deleteChannels(ids) {
    return await Channel.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getChannels() {
    return await Channel.findAll({where: {enable: true}});
  }
}

module.exports = ChannelService;


// ChannelService.addChannel({name: 'eaTong', account: '15284412582', password: 'eatong123'})
// ChannelService.updateChannels({name: 'eaTong', account: '18288757143', id: 5})
// ChannelService.deleteChannels([21]);

/*
(async () => {
  const Channels = await Channel.findAll();
  console.log(Channels.toString())
})();
*/
