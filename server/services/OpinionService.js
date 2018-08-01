/**
 * Created by eaTong on 2018-01-08 .
 * Description: auto generated in  2018-01-08
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Opinion = require('../models/Opinion');

class OpinionService extends BaseService {

  static async addOpinion(opinion) {
    opinion.enable = true;
    return await Opinion.create(opinion);
  }

  static async updateOpinions(data) {
    return await Opinion.update(data, {where: {id: data.id}})
  }

  static async deleteOpinions(ids) {
    return await Opinion.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getOpinions(pageIndex = 0, pageSize = 50) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await Opinion.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Opinion.findAll({
      offset: pageIndex * pageSize,
      limit: pageSize, ...option,
      order: [['createdAt', 'DESC']]
    });
    return {total, list}
  }

  static async getOpinionDetail(id) {
    return await Opinion.findOne({where: {id}});
  }
}

module.exports = OpinionService;
