/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const RoleMenu = sequelize.define('role_menu', {}, {timestamps: false,});

module.exports = RoleMenu;
