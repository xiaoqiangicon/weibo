/**
 * @description 关于微博的增删改查service
 */
const { Blog } = require('../db/model/index');
const { formateUser } = require('./_format')

async function createBlog({ userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image,
    })

    return result.dataValues;
}

async function getBlogListByUser(
    { userName, pageIndex = 0, pageSize = 10}
) {
    // 拼接查询条件
    const whereOpts = {}
    if (userName) {
        whereOpts.userName = userName;
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,    // 每页多少条
        offset: pageSize * pageIndex,   // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture',],
                where: whereOpts
            }
        ]
    })

    // result  result.count是总数，跟分页无关
    // result.rows 查询结果，是一个数组；

    // 获取datavalues
    let blogList = result.rows.map(row => row.dataValues);

    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues;
        blogItem.user = formateUser(user);
        return blogItem;
    })

    return {
        count: result.count,
        blogList,
    }
}


module.exports = {
    createBlog,
    getBlogListByUser,
}