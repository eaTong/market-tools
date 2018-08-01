
/**
 * Created by eaTong on 2018-01-08 .
 * Description: auto generated in  2018-01-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Opinion = sequelize.define('opinion', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Opinion;
