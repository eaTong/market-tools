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
    demand.images = JSON.stringify(demand.images || []);
    return await Demand.create(demand);
  }

  static async updateDemands(demand) {
    demand.images = JSON.stringify(demand.images || []);
    return await Demand.update(demand, {where: {id: demand.id}})
  }

  static async deleteDemands(ids) {
    return await Demand.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getDemands(pageIndex = 0, pageSize = 20, status, keywords) {
    const option = {
      where: {
        enable: true,
        [Op.or]: [{why: {[Op.like]: `%${keywords}%`}}, {content: {[Op.like]: `%${keywords}%`}}]
      }
    };
    if (status !== -1) {
      option.where.status = status;
    }
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

  static async agree({id, expectedPublish, comments}) {
    return Demand.update({status: 1, expectedPublish, comments}, {where: {id}});
  }

  static async refuse({id, refuseReason}) {
    return Demand.update({status: 2, refuseReason}, {where: {id}});
  }
}

module.exports = DemandService;
