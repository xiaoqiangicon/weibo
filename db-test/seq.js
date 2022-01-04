const Sequelize = require('sequelize');

const conf = {
  host: 'localhost',
  dialect: 'mysql',
}

// 线上环境，使用连接池
// conf.pool = {
//   max: 5, // 连接池中最大的连接数量，太大的话内存开销大一些
//   min: 0, // 最小
//   idle: 10000, // 如果一个连接池10s内没被使用就被释放
// }

const seq = new Sequelize('koa2_weibo_db', 'root', '123456', conf)

module.exports = seq;

// 测试连接ei
// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(() => {
//   console.log('err')
// })