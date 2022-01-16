/**
 * @description 微博 数据格式校验
 */

/**
 * @description user 数据格式校验
 */

 const { validate } = require('./validate');

 const schema = {
     type: 'object',
     properties: {
         content: {
             type: 'string'
         },
         image: {
             type: 'string',
             maxLength: 255,
         }
     }
 }
 
 // 执行校验,校验微博数据格式
 function blogValidate(data = {}) {
     return validate(schema, data);
 }
 
 module.exports = {
    blogValidate,
 }