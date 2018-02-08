/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments , checkLogin} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');


const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);

router.post('/api/*', async ctx => {
    ctx.status = 404;
    ctx.body = 'api not found';
});

module.exports = router;
