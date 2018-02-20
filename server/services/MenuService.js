/**
 * Created by eatong on 18-2-20.
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const Menu = require('../models/MenuModel');

class MenuService extends BaseService {
  static async getMenus(log) {
    // await Log.create(log);
    return await Menu.findAll({where: {enable: true}});
  }
}

module.exports = MenuService;
