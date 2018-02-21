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

(async () => {
  await initialDatabaseStructure();
  await initialMenu();
})();


async function initialDatabaseStructure() {

  await User.sync({alter: true});
  await Channel.sync({alter: true});
  await Record.sync({alter: true});
  await OperationLog.sync({alter: true});
  await Menu.sync({alter: true});
  await Role.sync({alter: true});
  await RoleMenu.sync({alter: true});
}

async function initialMenu() {
  const menuList = [
    {name: '数据录入', icon: 'download', path: '/admin/record', enable: true},
    {name: '月度统计', icon: 'line-chart', path: '/admin/dashboard/monthly', enable: true},
    {name: '渠道管理', icon: 'share-alt', path: '/admin/channel', enable: true},
    {name: '用户管理', icon: 'user', path: '/admin/user', enable: true},
    {name: '角色管理', icon: 'team', path: '/admin/role', enable: true},
  ];
  Menu.bulkCreate(menuList, {updateOnDuplicate: ['path', 'name', 'icon', 'enable']});
}
