/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Demand = sequelize.define('demand', {
  enable: Sequelize.BOOLEAN,
  type: Sequelize.INTEGER,
  demander: Sequelize.STRING,
  department: Sequelize.STRING,
  customerName: Sequelize.STRING,
  content: {type: Sequelize.STRING, defaultValue: ''},
  why: {type: Sequelize.STRING, defaultValue: ''},
  date: Sequelize.DATEONLY,
  status: {type: Sequelize.INTEGER, defaultValue: 0},
  expectedPublish: Sequelize.DATEONLY,
  comments: {type: Sequelize.STRING, defaultValue: ''},
  actualPublish: Sequelize.DATEONLY,
  refuseReason: Sequelize.STRING,
  images: Sequelize.TEXT
});

module.exports = Demand;
