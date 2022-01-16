/**
 * @description 微博数据模型
 */

const seq = require('../seq');
const { INTEGER, STRING, TEXT } = require('../types');

const Blog = seq.define('blog', {
    userInd: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
    },
    images: {
        type: STRING,
        comment: '图片地址',
    }
})

module.exports = Blog;