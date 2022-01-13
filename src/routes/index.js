const { loginRedirect } = require('../middlewares/loginChecks');

const router = require('koa-router')()

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [{
      id: 1,
      title: 'aaa'
    },{
      id: 2,
      title: 'bbb'
    },{
      id: 3,
      title: 'ccc'
    }]
  })
})


router.get('/json', async (ctx, next) => {
  const session = ctx.session;

  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;

  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum,
  }
})

router.get('/profile/:userName', async (ctx, next) => { // 动态参数
  const { userName } = ctx.params;
  ctx.body = {
    title: 'this is profile',
    name: userName
  }
})

router.get('/loadMore', async(ctx, next) => {

})

module.exports = router
