/**
 * @description error 404路由
 */

const router = require('koa-router')();

// error
router.get('/error', async(ctx, next) => {
  await ctx.render('error')
})

// 404,兜底路由
router.get('*', async(ctx, next) => {
  await ctx.render('404');
})


module.exports = router;