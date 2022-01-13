/**
 * @description user API 路由
 */

const router = require('koa-router')();
const { isExist, register, login } = require('../../controller/user')
const { userValidate } = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator');

router.prefix('/api/user');

// 注册路由
router.post('/register', genValidator(userValidate), async(ctx, next) => {
  const { userName, password, gender } = ctx.request.body;

  // 调用controller
  ctx.body = await register({userName, password, gender})
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  
  // controller
  ctx.body = await isExist(userName);
  
})

// 登陆
router.post('/login', async(ctx, next) => {
  const { userName, password } = ctx.request.body;

  // controller
  ctx.body = await login(ctx, userName, password);
})

module.exports = router;

// 路由专门用来派发路由，不做其他的事
// 路由调用controller里的值
// controll调用service；
// service做具体的业务处理和数据格式化；