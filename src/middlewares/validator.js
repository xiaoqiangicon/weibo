/**
 * @description json schema 验证中间件
 */

/**
 * 生成json schema 验证的中间件
 * @returns 
 */
const { ErrorModel } = require('../model/ResModel');
const { validatorFail } = require('../model/ErrorInfo')

function genValidator(validateFn) {
    // 定义中间件函数
    async function validator(ctx, next) {
        // 校验
        const data = ctx.request.body;
        const error = validateFn(data);

        if (error) {
            ctx.body = new ErrorModel(validatorFail);
            return;
        }
        // 验证成功，继续
        await next();
    }

    // 返回中间件；
    return validator
}

module.exports = {
    genValidator,
}