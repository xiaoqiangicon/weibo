/**
 * @description user controller
 * 主要负责业务逻辑和返回格式
 */

const { getUserInfo, createUser } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo, failInfo } = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp');

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

/**
 * 注册
 * @param {string} params 
 */
async function register({ userName, password, gender }) {
  // 业务逻辑
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名已存在
    console.log('已存在')
    return new ErrorModel(failInfo)
  } 

  // 注册service
  try {
    await createUser({ userName, password: doCrypto(password), gender });
    return new SuccessModel();
  } catch(ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(failInfo);
  }
}

module.exports = {
  isExist,
  register,
}