/**
 * Created by eatong on 18-2-10.
 */
const UserService = require('../services/UserService');
const BaseApi = require('../framework/BaseApi');


class UserApi extends BaseApi {
  static async addUser(ctx) {
    return await UserService.addUser(ctx.request.body);
  }

  static async updateUsers(ctx) {
    return await UserService.updateUsers(ctx.request.body);
  }

  static async deleteUsers(ctx) {
    return await UserService.deleteUsers(ctx.request.body);
  }

  static async getUsers(ctx) {
    return await UserService.getUsers(ctx.request.body);
  }
}

module.exports = UserApi;
