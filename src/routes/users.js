const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const {  SECREAT } = require('../conf/constants')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// jwt模拟登陆
router.post('/login', async(ctx, next) => {
  let userInfo
  const { username, password } = ctx.request.body;
  if (username === 'lee' && password==='123') {
    userInfo = {
      userId: 1,
      userName: 'lee',
      nickName: 'liq'
    }
  }

  // 加密userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECREAT, { expiresIn: '1h' })
  }

  if (userInfo == null) {
    ctx.body = {
      errno: -1,
      msg: 'fail'
    }
    return;
  }

  ctx.body = {
    errno: 0,
    data: token,
  }
})

router.get('/getUserInfo', async(ctx, next) => {
  const token = ctx.header.authorization;

  try {
    const payload = await verify(token.split(' ')[1], SECREAT)

    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (ex) {
    ctx.body = {
      errno: -1,
      msg: 'fail'
    }
  }
})

module.exports = router
