/**
 * @description user controller
 * 主要负责业务逻辑和返回格式
 */

const { getUserInfo } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')

/**
 * 
 * @param {string} userName 用户名 
 */
async function isExist (userName) {
  // 业务逻辑处理
  // 调用service层获取数据
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 已存在
    return new SuccessModel(userInfo)
  } else {
    // 未存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  // 统一返回格式
  
}

module.exports = {
  isExist,
}