
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
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await DemandService.getDemands(pageIndex, pageSize);
  }

  static async getDemandDetail(ctx) {
    return await DemandService.getDemandDetail(ctx.request.body);
  }

}

module.exports = DemandApi;
  