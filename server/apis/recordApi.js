/**
 * Created by eatong on 18-2-10.
 */
const RecordService = require('../services/RecordService');
const ZoomConfigService = require('../services/ZoomConfigService');
const BaseApi = require('../framework/BaseApi');
const {getFlatFields} = require('../../public/recordConfig');

const fields = getFlatFields().map(item => item.key);


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

  static async getGroupedIntervalReport(ctx) {
    const body = ctx.request.body;
    const records = await RecordService.getGroupedIntervalReport(body);
    if (body.autoZoom) {
      const zoomConfigs = await ZoomConfigService.getZoomConfigs();
      const zoomMapping = {};
      for (let zoomConfig of zoomConfigs.map(item => item.dataValues)) {
        zoomMapping[zoomConfig.key] = zoomConfig.zoom;
      }
      return records.map(record => {
        const val = record.dataValues;
        for (let key in val) {
          if (zoomMapping.hasOwnProperty(key)) {
            val[key] = val[key] * (zoomMapping[key] || 1)
          }
        }
        return {...val}
      });
    } else {
      return records;
    }
  }

  static async getIntervalReport(ctx) {
    return await RecordService.getIntervalReport(ctx.request.body);
  }
}

module.exports = RecordApi;
