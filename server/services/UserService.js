/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const User = require('../models/UserModel');

class UserService extends BaseService {

  static async addUser(user) {
    const usr = await User.findOne({where: {account: user.account}});
    if (usr) {
      throw new LogicError(`账号(${user.account})已存在`);
    }
    user.password = md5(user.password).toString();
    user.enable = true;
    return await User.create(user);
  }

  static async updateUsers(data) {
    const usr = await User.findOne({where: {account: data.account, id: {[Op.ne]: data.id}}});
    if (usr) {
      throw new LogicError(`账号(${data.account})已存在`);
    }
    // return await User.findAll();
    return await User.update(data, {where: {id: data.id}, fields: ['name', 'account']})
  }

  static async deleteUsers(ids) {
    return await User.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getUsers() {
    return await User.findAll({where: {enable: true}});
  }

  static async login({account, password}) {
    return await User.findOne({where: {account, enable: true, password: md5(password).toString()}});
  }
}

module.exports = UserService;


// UserService.addUser({name: 'eaTong', account: '15284412582', password: 'eatong123'})
// UserService.updateUsers({name: 'eaTong', account: '18288757143', id: 5})
// UserService.deleteUsers([21]);

// UserService.login({account: '123', password: '123'});

/*
(async () => {
  const users = await User.findAll();
  console.log(users.toString())
})();
*/
