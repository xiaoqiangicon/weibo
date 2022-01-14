/**
 * @description user api test
 */

const server = require('../server');

// 用户信息
const userName = `u_${Date.now()}`;
const password = `1234`;
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1,
}

// 存储cookie
let cookie = '';

// 注册
test('注册一个用户', async () => {
  const res = await server.post('/api/user/register').send(testUser)

  expect(res.body.errno.errno).toBe(0)
})

test('重复注册用户，应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)

  expect(res.body.errno.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名应该存在', async() => {
  const res = await server.post('/api/user/isExist').send({userName});

  expect(res.body.errno).not.toBe(0)
})

// json schema检测
test('json schema检测，非法格式应该失败', async() => {
  const res = await server.post('/api/user/register').send({
    userName: '1234',
    password: 'a',
    gender: 'mail'
  })

  expect(res.body.errno).not.toBe(0);
})

// 登陆
test('登陆应该成功', async() => {
  const res = await server.post('/api/user/login').send({userName, password});

  expect(res.body.errno.errno).toBe(0);
  cookie = res.headers['set-cookie'].join(',');
})

