/**
 * Created by eatong on 18-2-10.
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const ZoomConfig = require('../models/ZoomConfigModel');
const {getFlatFields} = require('../../public/recordConfig');

const fields = getFlatFields().map(item => item.key);

class ZoomConfigService extends BaseService {

  static async updateZoomConfigs(data) {
    const filteredData = data.filter(item => fields.indexOf(item.key) !== -1);
    console.log(filteredData);

    return await ZoomConfig.bulkCreate(filteredData, {updateOnDuplicate: ['key', 'zoom',]});
  }

  static async getZoomConfigs() {
    return await ZoomConfig.findAll();
  }
}

module.exports = ZoomConfigService;
