
/**
 * Created by eaTong on 2018-01-08 .
 * Description: auto generated in  2018-01-08
 */

const {LogicError} = require("../framework/errors");
const OpinionService = require('../services/OpinionService');
const BaseApi = require('../framework/BaseApi');


class OpinionApi extends BaseApi {
  static async addOpinion(ctx) {
    return await OpinionService.addOpinion(ctx.request.body);
  }

  static async updateOpinions(ctx) {
    return await OpinionService.updateOpinions(ctx.request.body);
  }

  static async deleteOpinions(ctx) {
    return await OpinionService.deleteOpinions(ctx.request.body.ids);
  }

  static async getOpinions(ctx) {
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await OpinionService.getOpinions(pageIndex, pageSize);
  }

  static async getOpinionDetail(ctx) {
    return await OpinionService.getOpinionDetail(ctx.request.body);
  }

}

module.exports = OpinionApi;
  