
/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Demand = require('../models/Demand');

class DemandService extends BaseService {

  static async addDemand(demand) {
    demand.enable = true;
    return await Demand.create(demand);
  }

  static async updateDemands(data) {
    return await Demand.update(data, {where: {id: data.id}})
  }

  static async deleteDemands(ids) {
    return await Demand.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getDemands(pageIndex = 0, pageSize = 20) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await Demand.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Demand.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  }

  static async getDemandDetail(id) {
    return await Demand.findOne({where: {id}});
  }
}

module.exports = DemandService;
  