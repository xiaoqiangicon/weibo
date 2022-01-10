/**
 * @description user API 路由
 */

const router = require('koa-router')();
const { isExist } = require('../../controller/user')

router.prefix('/api/user');

// 注册路由
router.post('/register', async(ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  console.log('isexist')
  // controller
  ctx.body = await isExist(userName);
  
})

module.exports = router;

// 路由专门用来派发路由，不做其他的事
// 路由调用controller里的值
// controll调用service；
// service做具体的业务处理和数据格式化；