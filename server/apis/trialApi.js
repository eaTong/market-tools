/**
 * Created by eatong on 18-2-10.
 */
const TrialService = require('../services/TrialService');
const BaseApi = require('../framework/BaseApi');


class TrialApi extends BaseApi {
  static async addTrial(ctx) {
    return await TrialService.addTrial(ctx.request.body);
  }

  static async updateTrials(ctx) {
    return await TrialService.updateTrials(ctx.request.body);
  }

  static async deleteTrials(ctx) {
    return await TrialService.deleteTrials(ctx.request.body.ids);
  }

  static async getTrials(ctx) {
    return await TrialService.getTrials(ctx.request.body);
  }
}

module.exports = TrialApi;
