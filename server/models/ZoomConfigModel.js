/**
 * Created by eatong on 18-4-6.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Trial = sequelize.define('zoom_config', {
  key: {type: Sequelize.STRING, unique: true, notnull: true},
  zoom: Sequelize.FLOAT,
}, {timestamps: false,});

module.exports = Trial;
