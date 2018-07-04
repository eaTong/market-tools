/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */
const fs = require('fs');
const {Duplex, Transform} = require('stream');
const moment = require('moment');
const nodemailer = require('nodemailer');
const Excel = require('exceljs');
const {mail} = require('../config');
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

  static async statics() {
    const today = moment();
    const monday = moment().set('day', 0);
    const monthAgo = moment().set('month', today.get('month') - 1);
    //--------今日新增
    const dayIncreasedResult = await Demand.findOne({
      where: {date: today.format('YYYY-MM-DD'), enable: true},
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const dayIncreased = dayIncreasedResult.dataValues.total;
    //--------本周新增
    const weekIncreasedResult = await Demand.findOne({
      where: {date: monday.format('YYYY-MM-DD'), enable: true},
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const weekIncreased = weekIncreasedResult.dataValues.total;

    //--------未完成新增
    const uncompleteResult = await Demand.findOne({
      where: {status: 1, enable: true},
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const uncomplete = uncompleteResult.dataValues.total;
    //--------已发布新增
    const publishedResult = await Demand.findOne({
      where: {status: 3, enable: true},
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const published = publishedResult.dataValues.total;
    //--------已拒绝新增
    const refusedResult = await Demand.findOne({
      where: {status: 2, enable: true},
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const refused = refusedResult.dataValues.total;
    //-------- 获取所有需求明细
    const allDemandResult = await Demand.findAll({
      where: {enable: true}
    });
    //create a excel
    const workbook = new Excel.Workbook();
    workbook.creator = 'eaTong-market-tool';
    workbook.lastModifiedBy = 'eaTong-market-tool';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('My Sheet');
    worksheet.columns = [
      {header: '需求内容', key: 'content', width: 50, style: {alignment: {wrapText: true}}},
      {header: '需求提出背景', key: 'why', width: 50, style: {alignment: {wrapText: true}}},
      {header: '需求所属客户名称', key: 'customerName', width: 20, style: {alignment: {wrapText: true}}},
      {header: '需求提出人', key: 'demander', width: 10, style: {alignment: {wrapText: true}}},
      {header: '需求提出部门', key: 'department', width: 20, style: {alignment: {wrapText: true}}},
      {header: '需求提出时间', key: 'date', width: 15, style: {alignment: {wrapText: true}}},
      {header: '状态', key: 'status', width: 10},
      {header: '未通过理由', key: 'refuseReason', width: 30},
      {header: '预计发布时间', key: 'expectedPublish', width: 15},
      {header: '实际发布时间', key: 'actualPublish', width: 15}
    ];

    allDemandResult.forEach(item => {
      const demand = item.dataValues;
      worksheet.addRow({...demand, status: getStatus(demand.status)}).commit();
    });

    const demandStream = new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
      },
    });

    await workbook.xlsx.write(demandStream);
    // await worksheet.commit();

    const mailContent = `
<div>
  <p style="color:#999">今日新增数量：${dayIncreased}</p>      
  <p style="color:#666">本周新增数量：${weekIncreased}</p>      
  <p style="color:#333">未完成数量：${uncomplete}</p>      
  <p style="color:#6abf47">已完成数量：${published}</p>      
  <p style="color:#eb655e">已拒绝数量：${refused}</p>      
  <p>需求详情见附件</p>
</div>
    `;

    const transporter = nodemailer.createTransport(mail);
    const mailObj = {
      from: '智装天下需求统计 <service@aikesi-soft.com>',
      // 主题
      subject: '智装天下需求统计',
      // 收件人
      to: 'zhouyidong@aikesi-soft.com',
      // 邮件内容，HTML格式
      html: mailContent,
      attachments: [{filename: '需求统计表.xlsx', content: demandStream}]
    };
    transporter.sendMail(mailObj);
  }
}

function getStatus(status) {
  switch (status) {
    case 0:
      return '待处理';
    case 1:
      return '已同意';
    case 2:
      return '已拒绝';
    case 3:
      return '已发布';
  }
}

module.exports = DemandService;
