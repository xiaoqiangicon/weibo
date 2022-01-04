const Sequelize = require('sequelize');
const seq = require('./seq');

// 创建user模型
const User = seq.define('user', { // 表名users,
  // id会自动创建，并设为主键，自增
  userName: {
    type: Sequelize.STRING,  // VARCHAR(255)
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'
  }
  // 会自动创建createdAt和updateAt
})

// 创建blog模型
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

// 外键关联
Blog.belongsTo(User, {
  foreignKey: 'userId', // 创建外键 Blog.userId -> User.id

});
User.hasMany(Blog, {
  foreignKey: 'userId', // 创建外键 Blog.userId -> User.id
})
// Blog.belongsTo(User)

module.exports = {
  User,
  Blog,
}