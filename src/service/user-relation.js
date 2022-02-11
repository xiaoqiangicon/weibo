/**
 * @description 用户关系service
 */

const { User, UserRelation } = require('../db/model/index');

/**
 * 
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注人的id 
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      'id', 'desc'
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
} 

module.exports = {
  getUsersByFollower,
}