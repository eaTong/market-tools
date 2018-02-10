/**
 * Created by eatong on 18-2-10.
 */
const BaseService = require('../framework/BaseService');

class UserService extends BaseService {

  static async addUser() {
    console.log('add user...');

  }

  static async getUsers() {
    console.log('get user....');
    return 123
  }
}

module.exports = UserService;
