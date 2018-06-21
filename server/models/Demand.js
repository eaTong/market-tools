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
  content: Sequelize.STRING,
  why: Sequelize.STRING,
  date: Sequelize.DATEONLY,
  status: Sequelize.INTEGER,
  publishDate: Sequelize.DATEONLY

});

module.exports = Demand;
