/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/UserModel');
const Channel = require('../server/models/ChannelModel');
const Record = require('../server/models/RecordModel');
const OperationLog = require('../server/models/OperationLogModel');
const Menu = require('../server/models/MenuModel');
const Role = require('../server/models/RoleModel');
const RoleMenu = require('../server/models/RoleMenuModel');
const UserRole = require('../server/models/UserRole');
const Trial = require('../server/models/TrialModel');
const ZoomConfig = require('../server/models/ZoomConfigModel');
const Demand = require('../server/models/Demand');
const Opinion = require('../server/models/Opinion');
//UPDATE_TAG:importModel

const {getFlatFields} = require('../public/recordConfig');

(async () => {
  await initialDatabaseStructure();
  await initialMenu();
  await initRole();
  // await initZoomConfig();
  process.exit();
})();


async function initialDatabaseStructure() {

  await User.sync({alter: true});
  await Channel.sync({alter: true});
  await Record.sync({alter: true});
  await OperationLog.sync({alter: true});
  await Menu.sync({alter: true});
  await Role.sync({alter: true});
  await RoleMenu.sync({alter: true});
  await UserRole.sync({alter: true});
  await Trial.sync({alter: true});
  await ZoomConfig.sync({alter: true});
  await Demand.sync({alter: true});
  await Opinion.sync({alter: true});
//UPDATE_TAG:asyncModel
}

async function initialMenu() {
  const menuList = [
    {name: '数据录入', icon: 'download', path: '/admin/record', enable: true},
    {name: '折线图', icon: 'line-chart', path: '/admin/dashboard/line', enable: true},
    {name: '渠道管理', icon: 'share-alt', path: '/admin/channel', enable: true},
    {name: '用户管理', icon: 'user', path: '/admin/user', enable: true},
    {name: '角色管理', icon: 'team', path: '/admin/role', enable: true},
    {name: '数据映射', icon: 'search', path: '/admin/zoom', enable: true},
    {name: '需求管理', icon: 'customer-service', path: '/admin/demand', enable: true},
    {name: '意见管理', icon: 'customer-service', path: '/admin/opinion', enable: true},

    // deletion
    {name: '月度统计', icon: 'line-chart', path: '/admin/dashboard/monthly', enable: false},
    {name: '柱状图', icon: 'bar-chart', path: '/admin/dashboard/bar', enable: false},
  ];
  await Menu.bulkCreate(menuList, {updateOnDuplicate: ['path', 'name', 'icon', 'enable']});
}

async function initRole() {
  const role = await Role.findAll();
  if (role.length === 0) {
    const adminRole = await Role.create({name: '系统管理员', enable: true});
    const menus = await Menu.findAll();
    adminRole.setMenus(menus);
    await adminRole.save();
  }
}
