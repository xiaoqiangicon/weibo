/**
 * @description 失败信息集合 包括errno 和message
 */

module.exports = {
    registerUserNameNotExistInfo: {
        errno: -1,
        message: '用户名不存在',
    },
    nickNameExist: {
        errno: -1, 
        message: '用户名已存在',
    },
    failInfo: {
        errno: -1,
        message: '统一错误提示'
    },
    validatorFail: {
        errno: -1,
        message: '验证出错了',
    },
    loginFail: {
        errno: -1,
        message: '登陆失败',
    }
}