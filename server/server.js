/**
 * Created by eatong on 18-2-8.
 */
const {createReadStream} = require('fs');
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaConnect = require('koa-connect');
const compression = require('compression');
const cookie = require('koa-cookie').default;
const serve = require('koa-static');
// const session = require('koa-generic-session');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const router = require('./routers');
const {mysql} = require('./config');

const port = parseInt(process.env.PORT, 10) || 8001;
const dev = process.env.NODE_ENV !== 'production';
const shortUrlMapping = {
  a: '/H5/zztx.html',
  c: '/H5/zztx_c.html',
  d: '/H5/zztx_d.html',
  e: '/H5/zztx_e.html',
  f: '/H5/zztx_f.html',
};

const app = new Koa();
//use compression
app.use(koaConnect(compression()));
// app.use(koaLogger());
app.use(cookie());
app.use(serve('dist'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
});
app.use(serve('assets'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
});

app.keys = ['key-for-eaTong'];
app.use(session({
  store: new MysqlStore(mysql),
  rolling: true,
  cookie: {
    maxage: 24 * 60 * 60 * 1000
  }
}));
//use koaBody to resolve data
app.use(koaBody({multipart: true}));
//all routes just all API
app.use(router.routes());
//short site

router.use('/s/*', async (ctx, next) => {
  const key = ctx.originalUrl.replace('/s/', '');
  ctx.redirect(shortUrlMapping[key]);
});
// /admin pages need to check login
router.get('/admin*', async (ctx, next) => {
  if (!ctx.session.loginUser) {
    ctx.redirect('/login');
  } else {
    await next();
  }
});

router.get('/*', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = createReadStream('dist/index.html');
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`)
});
