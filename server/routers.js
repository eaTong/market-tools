/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments, checkLogin, insertLog} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const userApi = require('./apis/userApi');
const roleApi = require('./apis/roleApi');
const channelApi = require('./apis/channelApi');
const recordApi = require('./apis/recordApi');
const menuApi = require('./apis/menuApi');

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);

router.post('/api/menu/get', menuApi.getMenus);

router.post('/api/role/add', insertLog('add'), checkArguments(['name']), roleApi.addRole);
router.post('/api/role/get', roleApi.getRoles);
router.post('/api/role/update', insertLog('update'), checkArguments(['id', 'name']), roleApi.updateRoles);
router.post('/api/role/delete', insertLog('delete'), checkArguments(['ids']), roleApi.deleteRoles);

router.post('/api/user/add', insertLog('add'), checkArguments(['account', 'name']), userApi.addUser);
router.post('/api/user/get', userApi.getUsers);
router.post('/api/user/update', insertLog('update'), checkArguments(['id', 'account', 'name']), userApi.updateUsers);
router.post('/api/user/delete', insertLog('delete'), checkArguments(['ids']), userApi.deleteUsers);
router.post('/api/user/login', insertLog('login'), checkArguments(['account', 'password']), userApi.login);

router.post('/api/channel/add', insertLog('add'), checkArguments(['name']), channelApi.addChannel);
router.post('/api/channel/get', channelApi.getChannels);
router.post('/api/channel/update', insertLog('update'), checkArguments(['id', 'name']), channelApi.updateChannels);
router.post('/api/channel/delete', insertLog('delete'), checkArguments(['ids']), channelApi.deleteChannels);

router.post('/api/record/get', recordApi.getRecords);
router.post('/api/record/update', insertLog('update'), recordApi.updateRecords);
router.post('/api/record/delete', insertLog('delete'), recordApi.deleteRecords);
router.post('/api/record/monthly', checkArguments(['startDate', 'endDate', 'channels']), recordApi.getMonthlyReport);

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
