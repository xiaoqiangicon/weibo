/**
 * @description 关于微博的增删改查service
 */

const { Blog } = require('../db/model/index');

async function createBlog({ userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image,
    })

    return result.dataValues;
}


module.exports = {
    createBlog,
}