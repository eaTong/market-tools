/**
 * Created by eatong on 18-2-8.
 */
const path = require('path');
const next = require('next');
const {useStaticRendering} = require('mobx-react');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaConnect = require('koa-connect');
const compression = require('compression');
const cookie = require('koa-cookie').default;
const staticCache = require('koa-static-cache');
const serve = require('koa-static');
const session = require('koa-generic-session');
const MysqlStore = require('koa-mysql-session');
const router = require('./routers');
const {mysql} = require('./config');

const port = parseInt(process.env.PORT, 10) || 8001;
const dev = process.env.NODE_ENV !== 'production';
const keys = ['key for eaTong'];


useStaticRendering(true);

const app = new Koa();
//use compression
app.use(koaConnect(compression()));
// app.use(koaLogger());
app.use(cookie());
app.use(serve('assets'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
});
app.use(staticCache(path.join(__dirname, 'static'), {
  maxAge: 365 * 24 * 60 * 60
}));

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

// /admin pages need to check login
router.get('/admin*', async (ctx, next) => {
  if (!ctx.session.loginUser) {
    ctx.redirect('/login');
  } else {
    await next();
  }
});

app.use(ctx => {
  ctx.respond = false;
  ctx.res.statusCode = 200; // because koa defaults to 404
  handler(ctx.req, ctx.res)
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`)
});
