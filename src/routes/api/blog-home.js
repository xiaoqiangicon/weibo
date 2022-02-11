/**
 * @description 首页API路由
 */

const { create } = require('../../controller/blog-home');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { genValidator } = require('../../middlewares/validator');

const router = require('koa-router')();
const { loginCheck, loginRedirect } = require('../../middlewares/loginChecks');
const { blogValidate } = require('../../validator/blog');
const { SuccessModel } = require('../../model/ResModel');

router.prefix('/api/blog');

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async(ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    // controller
    ctx.body = await create({userId, content, image});
})

// 获取微博列表
router.get('/list', loginCheck, async (ctx, next) => {
    const { userName, pageIndex } = ctx.query;
    
    // 获取第一页数据
    ctx.body = await getProfileBlogList(userName, pageIndex || 0)
})

// 获取粉丝


module.exports = router;