/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments, checkLogin, structureData, insertLog} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const FileApi = require('./apis/FileApi');
const userApi = require('./apis/userApi');
const roleApi = require('./apis/roleApi');
const channelApi = require('./apis/channelApi');
const recordApi = require('./apis/recordApi');
const menuApi = require('./apis/menuApi');
const trialApi = require('./apis/trialApi');
const zoomConfigApi = require('./apis/zoomConfigApi');
const DemandApi = require('./apis/DemandApi');
const OpinionApi = require('./apis/OpinionApi');
//UPDATE_TAG:importApi

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);
router.post('/api/*', structureData);

router.post('/api/pub/trial', trialApi.addTrial);
router.post('/api/pub/opinion/add', checkArguments(['name']), OpinionApi.addOpinion);


router.post('/api/image/upload', FileApi.uploadImage);

router.post('/api/menu/get', menuApi.getMenus);
router.post('/api/menu/authorised', menuApi.getAuthorisedMenu);

router.post('/api/role/add', insertLog('add'), checkArguments(['name']), roleApi.addRole);
router.post('/api/role/get', roleApi.getRoles);
router.post('/api/role/update', insertLog('update'), checkArguments(['id', 'name']), roleApi.updateRoles);
router.post('/api/role/delete', insertLog('delete'), checkArguments(['ids']), roleApi.deleteRoles);
router.post('/api/role/grant', insertLog('grant'), checkArguments(['roleId', 'menus']), roleApi.grantMenus);

router.post('/api/user/add', insertLog('add'), checkArguments(['account', 'name']), userApi.addUser);
router.post('/api/user/get', userApi.getUsers);
router.post('/api/user/update', insertLog('update'), checkArguments(['id', 'account', 'name']), userApi.updateUsers);
router.post('/api/user/delete', insertLog('delete'), checkArguments(['ids']), userApi.deleteUsers);
router.post('/api/user/login', insertLog('login'), checkArguments(['account', 'password']), userApi.login);
router.post('/api/user/logout', insertLog('login'), userApi.logout);
router.post('/api/user/grant', insertLog('grant'), checkArguments(['userId', 'roles']), userApi.grantRole);

router.post('/api/channel/add', insertLog('add'), checkArguments(['name']), channelApi.addChannel);
router.post('/api/channel/get', channelApi.getChannels);
router.post('/api/channel/update', insertLog('update'), checkArguments(['id', 'name']), channelApi.updateChannels);
router.post('/api/channel/delete', insertLog('delete'), checkArguments(['ids']), channelApi.deleteChannels);

router.post('/api/record/get', recordApi.getRecords);
router.post('/api/record/update', insertLog('update'), recordApi.updateRecords);
router.post('/api/record/delete', insertLog('delete'), recordApi.deleteRecords);
router.post('/api/record/interval-group', checkArguments(['startDate', 'endDate', 'channels']), recordApi.getGroupedIntervalReport);
router.post('/api/record/interval', checkArguments(['startDate', 'endDate', 'channels']), recordApi.getIntervalReport);


router.post('/api/zoomConfig/get', zoomConfigApi.getZoomConfigs);
router.post('/api/zoomConfig/update', insertLog('update'), zoomConfigApi.updateZoomConfigs);


router.post('/api/demand/add', insertLog('add'), checkArguments(['type', 'demander', 'department', 'customerName', 'date']), DemandApi.addDemand);
router.post('/api/demand/get', DemandApi.getDemands);
router.post('/api/demand/update', insertLog('update'), checkArguments(['id', 'type', 'demander', 'department', 'customerName', 'date']), DemandApi.updateDemands);
router.post('/api/demand/delete', insertLog('delete'), checkArguments(['ids']), DemandApi.deleteDemands);
router.post('/api/demand/detail', checkArguments(['id']), DemandApi.getDemandDetail);
router.post('/api/demand/agree', checkArguments(['id']), DemandApi.agree);
router.post('/api/demand/refuse', checkArguments(['id']), DemandApi.refuse);

router.post('/api/opinion/add', insertLog('add'), checkArguments(['name']), OpinionApi.addOpinion);
router.post('/api/opinion/get', OpinionApi.getOpinions);
router.post('/api/opinion/update', insertLog('update'), checkArguments(['id', 'name']), OpinionApi.updateOpinions);
router.post('/api/opinion/delete', insertLog('delete'), checkArguments(['ids']), OpinionApi.deleteOpinions);
router.post('/api/opinion/detail', checkArguments(['id']), OpinionApi.getOpinionDetail);
//UPDATE_TAG:defineRouter

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
