/**
 * @description 登陆验证的中间件
 */

const { loginFail } = require("../model/ErrorInfo");
const { ErrorModel } = require("../model/ResModel");

async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登陆
    await next();
    return;
  }

  // 未登录
  ctx.body = new ErrorModel(loginFail)
}

async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登陆
    await next();
    return;
  }

  // 未登录
  const curUrl = ctx.url;
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
  loginCheck,
  loginRedirect,
}