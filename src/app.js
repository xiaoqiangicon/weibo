const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jwtKoa = require('koa-jwt')
const koaStatic = require('koa-static')
const path = require('path')

const { REDIS_CONF } = require('./conf/db')
const {  JWT_SECREAT_KEY, SESSION_SECREATE_KEY } = require('./conf/constant')

const index = require('./routes/index')
const users = require('./routes/users')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')
const utilsAPIRouter = require('./routes/api/utils')
const blogHomeAPIRouter = require('./routes/api/blog-home')

// error handler，在页面中显示
let onerrorConf = {}
onerrorConf = {
  redirect: '/error'
}
onerror(app, onerrorConf)

// jwt 配置
// app.use(jwtKoa({
//   secret: JWT_SECREAT_KEY,
// }).unless({
//   path: [/^\/users\/login/] // 自定义哪些目录忽略jwt验证
// }))

// middlewares, post的数据转换;
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public')) // public当作静态资源的方式访问
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', { // 注册一个ejs
  extension: 'ejs'
}))

// session 配置,加密密匙
app.keys = [SESSION_SECREATE_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name, 默认koa.sid
  prefix: 'webo:sess:', // redis key的前缀，默认koa:sess:
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // ms
  },
  // ttl: 24 * 60 * 60 * 1000, // redis过期时间
  store: redisStore({
    all: `127.0.0.1:6379`
  }),
}))

// logger（自己手写的，作为演示）
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由注册到最下面

// error-handling，控制台报错
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
