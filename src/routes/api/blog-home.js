/**
 * @description 首页API路由
 */

const { create } = require('../../controller/blog-home');

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/blog');

// 创建微博
router.post('/create', loginCheck, async(ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    // controller
    ctx.body = await create({userId, content, image});
})

module.exports = router;