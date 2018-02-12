/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments, checkLogin} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const userApi = require('./apis/userApi');
const channelApi = require('./apis/channelApi');

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);
router.get('/api/*', checkLogin);

router.post('/api/user/add', userApi.addUser);
router.post('/api/user/get', userApi.getUsers);
router.post('/api/user/update', userApi.updateUsers);
router.post('/api/user/delete', userApi.deleteUsers);

router.post('/api/channel/add', channelApi.addChannel);
router.post('/api/channel/get', channelApi.getChannels);
router.post('/api/channel/update', channelApi.updateChannels);
router.post('/api/channel/delete', channelApi.deleteChannels);

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
