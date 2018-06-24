/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

const {LogicError} = require("../framework/errors");
const DemandService = require('../services/DemandService');
const BaseApi = require('../framework/BaseApi');


class DemandApi extends BaseApi {
  static async addDemand(ctx) {
    return await DemandService.addDemand(ctx.request.body);
  }

  static async updateDemands(ctx) {
    return await DemandService.updateDemands(ctx.request.body);
  }

  static async deleteDemands(ctx) {
    return await DemandService.deleteDemands(ctx.request.body.ids);
  }

  static async getDemands(ctx) {
    const {pageIndex = 0, pageSize = 20, status = -1, keywords} = ctx.request.body;
    return await DemandService.getDemands(pageIndex, pageSize, status, keywords);
  }

  static async getDemandDetail(ctx) {
    return await DemandService.getDemandDetail(ctx.request.body);
  }

  static async agree(ctx) {
    return await DemandService.agree(ctx.request.body);
  }

  static async refuse(ctx) {
    return await DemandService.refuse(ctx.request.body);
  }

}

module.exports = DemandApi;
