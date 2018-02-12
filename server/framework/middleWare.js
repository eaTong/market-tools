/**
 * Created by eatong on 17-12-28.
 */

const {ArgMissError, LogicError} = require('./errors');

module.exports.checkArguments = (args) => {
  return async (ctx, next) => {
    if (args) {
      const bodyKeys = Object.keys(ctx.request.body);
      if (typeof args === 'string') {
        if (bodyKeys.indexOf(args) === -1) {
          throw(new ArgMissError(args));
        }
      } else {
        for (let arg of args) {
          if (bodyKeys.indexOf(arg) === -1) {
            throw(new ArgMissError(arg));
          }
        }
      }
    }
    await next();
  }
};

module.exports.checkLogin = async (ctx, next) => {
  /*if (!/^\/api\/pub/.test(ctx.originalUrl) && ctx.originalUrl !== '/api/user/login') {
    if (!ctx.session.loginUser) {
      ctx.status = 401;
      ctx.body = {success: false, data: {}, message: 'this api is not a public api ,please login'};
      return;
    }
  }*/

  try {
    const data = await next();
    ctx.body = {success: true, data, message: ''};
  } catch (ex) {
    console.log(ex);
    if (ex instanceof ArgMissError) {
      ctx.status = 400;
      ctx.body = {success: false, data: {}, message: ex.message};
    } else if (ex instanceof LogicError) {
      ctx.status = 200;
      ctx.body = {success: false, data: {}, message: ex.message};

    } else {
      ctx.status = 500;
      ctx.body = {success: false, data: {}, message: ex.message};
    }
  }
};
