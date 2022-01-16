/**
 * @description 首页controller
 */
const xss = require('xss')
const { createBlog } = require("../service/blog")
const { SuccessModel, ErrorModel } = require('../model/ResModel')


// 创建微博
async function create ({userId, content, image}) {
    // service
    try {
        const blog = await createBlog({userId, content: xss(content), image})
        return new SuccessModel(blog);
    } catch(ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel({
            errno: -1,
            message: '创建微博失败',
        })
    }
}

module.exports = {
    create,
}