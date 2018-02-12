/**
 * Created by eatong on 18-2-10.
 */
const ChannelService = require('../services/ChannelService');
const BaseApi = require('../framework/BaseApi');


class ChannelApi extends BaseApi {
  static async addChannel(ctx) {
    return await ChannelService.addChannel(ctx.request.body);
  }

  static async updateChannels(ctx) {
    return await ChannelService.updateChannels(ctx.request.body);
  }

  static async deleteChannels(ctx) {
    return await ChannelService.deleteChannels(ctx.request.body.ids);
  }

  static async getChannels(ctx) {
    return await ChannelService.getChannels(ctx.request.body);
  }
}

module.exports = ChannelApi;
