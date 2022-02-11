/**
 * @description 数据模型入口文件
 * 
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// 两个外键
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId',
})

module.exports = {
  User,
  Blog,
  UserRelation,
}