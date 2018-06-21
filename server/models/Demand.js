
/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Demand = sequelize.define('demand', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Demand;
