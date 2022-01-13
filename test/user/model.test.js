/**
 * @description user model test
 */

const { User } = require('../../src/db/model/index');

test('User模型的各个属性，符合预期', () => {
  // build会构建一个内存的User实例，但是不回提交到数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三',
    //gender: 1,
    picture: '/xxx.png',
    city: '北京',
  })

  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123')
  expect(user.nickName).toBe('张三')
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
})