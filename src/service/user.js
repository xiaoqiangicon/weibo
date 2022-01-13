/**
 * @description user service
 * 数据处理和格式化
 */

const { User } = require('../db/model/index');
const { formateUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {password})
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  })
  if (result === null) {
    // 未找到
    return result;
  }

  // 格式化
  const formatRes = formateUser(result.dataValues)

  return formatRes;
}


/**
 * 创建用户
 * @param {string} param 
 */
async function createUser ({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender,
  })

  return result.dataValues;
}

// 删除用户 
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    }
  })
  // result删除的行数
  return result > 0;
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}