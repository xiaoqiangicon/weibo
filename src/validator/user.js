/**
 * @description user 数据格式校验
 */

const { validate } = require('./validate');

const schema = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
            maxLength: 255,
            minLength: 2,
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3,
        },
        nickName: {
            type: 'string',
            maxLength: 255,
        },
        picture: {
            type: 'string',
            maxLength: 255,
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2,
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
    }
}

// 执行校验,校验用户数据格式
function userValidate(data = {}) {
    return validate(schema, data);
}

module.exports = {
    userValidate,
}