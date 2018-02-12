/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const User = require('../models/UserModel');

class UserService extends BaseService {

  static async addUser(user) {
    user.password = md5(user.password).toString();
    user.enable = true;
    return await User.create(user);
  }

  static async updateUsers(data) {
    // return await User.findAll();
    return await User.update(data, {where: {id: data.id}, fields: ['name', 'account']})
  }

  static async deleteUsers(ids) {
    return await User.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getUsers() {
    return await User.findAll({where:{enable:true}});
  }
}

module.exports = UserService;


// UserService.addUser({name: 'eaTong', account: '15284412582', password: 'eatong123'})
// UserService.updateUsers({name: 'eaTong', account: '18288757143', id: 5})
// UserService.deleteUsers([21]);

/*
(async () => {
  const users = await User.findAll();
  console.log(users.toString())
})();
*/
