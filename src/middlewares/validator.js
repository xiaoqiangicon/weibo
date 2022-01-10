/**
 * @description json schema 验证中间件
 */

/**
 * 生成json schema 验证的中间件
 * @returns 
 */
function genValidator(userValidate) {
    async function validator(ctx, next) {
    // 校验
    userValidate(ctx.request.body);
    }
    return validator
}

module.exports = {
    genValidator,
}