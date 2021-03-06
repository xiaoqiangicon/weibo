/**
 * @description user controller
 * 主要负责业务逻辑和返回格式
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo, failInfo, nickNameExist, loginFail } = require('../model/ErrorInfo')
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
    return new SuccessModel(nickNameExist)
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
    return new ErrorModel(nickNameExist)
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


/**
 * 登录
 * @param {Object} ctx 
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
  // 登陆成功 ctx.session.userInfo = ***
  // 本质：查询用户是否存在

  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    // 登陆失败
    return new ErrorModel(loginFail)
  }

  // 登陆成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }

  return new SuccessModel({userInfo});
}

// 删除当前用户
async function deleteCurUser(userName) {
  // service
  const result = await deleteUser();

  if (result) {
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel({
    error: -1,
    message: '删除用户失败',
  })
}

// 修改个人信息；
async function changeInfo (ctx, {nickName, city, picture}) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }
  // service
  const result = await updateUser({newNickName: nickName, newCity: city, newPicture: picture}, {userName});

  if (result) {
    // 修改成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel();
  }
  return new ErrorModel({
    errno: -1,
    message: '修改信息失败'
  })
}

// 修改密码
async function changePassword(userName, password, newPassword) {
  const result = await updateUser({
    newPassword: doCrypto(newPassword)
  }, {
    userName,
    password: doCrypto(password)
  })

  if (result) {
    // 成功
    return new SuccessModel();
  } 

  return new ErrorModel({
    errno: -1,
    message: '修改密码失败'
  })
}

async function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
}