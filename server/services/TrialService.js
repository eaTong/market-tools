/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');
const {LogicError} = require('../framework/errors');
const nodemailer = require('nodemailer');
const {mail} = require('../config');
const BaseService = require('../framework/BaseService');
const Trial = require('../models/TrialModel');

class TrialService extends BaseService {

  static async addTrial(trial) {
    const transporter = nodemailer.createTransport(mail);
    const mailObj = {
      from: '智装天下试用申请 <service@aikesi-soft.com>',
      // 主题
      subject: '智装天下试用申请',
      // 收件人
      to: 'sales@aikesi-soft.com',
      // 邮件内容，HTML格式
      html: `<div>
       <h2>试用申请</h2>
       <p>姓名：${trial.contact || ''}</p>
       <p>企业名称：${trial.company || ''}</p>
       <p>联系电话：${trial.telephone || ''}</p>
       <p>联系邮箱：${trial.email || ''}</p>
       <p>公司地址：${trial.address || ''}</p>
       <p>员工人数：${trial.count || ''}</p>
      </div>
      `
    };
    transporter.sendMail(mailObj);
    return await Trial.create(trial);
  }

  static async updateTrials(data) {
    return await Trial.update(data, {where: {id: data.id}, fields: ['name', 'remark']})
  }

  static async getTrials() {
    return await Trial.findAll({});
  }

}

module.exports = TrialService;
