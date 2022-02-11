const { PAGE_SIZE } = require('../conf/constant');
const { getBlogListByUser } = require('../service/blog');
const { SuccessModel } = require('../model/ResModel');

async function getProfileBlogList(userName, pageIndex=0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const blogList = result.blogList;

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
  })
}

module.exports = {
  getProfileBlogList,
}