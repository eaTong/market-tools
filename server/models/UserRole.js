/**
 * Created by eatong on 18-2-21.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const UserRole = sequelize.define('user_role', {}, {timestamps: false,});

module.exports = UserRole;
