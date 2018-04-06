/**
 * Created by eatong on 18-2-10.
 */
const ZoomConfigService = require('../services/ZoomConfigService');
const BaseApi = require('../framework/BaseApi');


class ZoomConfigApi extends BaseApi {

  static async updateZoomConfigs(ctx) {
    return await ZoomConfigService.updateZoomConfigs(ctx.request.body);
  }


  static async getZoomConfigs(ctx) {
    return await ZoomConfigService.getZoomConfigs(ctx.request.body);
  }
}

module.exports = ZoomConfigApi;
