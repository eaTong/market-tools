/**
 * Created by eatong on 18-2-10.
 */
const RecordService = require('../services/RecordService');
const BaseApi = require('../framework/BaseApi');


class RecordApi extends BaseApi {
  static async addRecord(ctx) {
    return await RecordService.addRecord(ctx.request.body);
  }

  static async updateRecords(ctx) {
    return await RecordService.updateRecords(ctx.request.body);
  }

  static async deleteRecords(ctx) {
    return await RecordService.deleteRecords(ctx.request.body.ids);
  }

  static async getRecords(ctx) {
    return await RecordService.getRecords(ctx.request.body);
  }
  static async getIntervalReport(ctx) {
    return await RecordService.getIntervalReport(ctx.request.body);
  }
}

module.exports = RecordApi;
