const { User, Blog } = require('./model');

!(async function() {

  // 删除一条blog
  // const delBlogRes = await Blog.destroy({
  //   where: {
  //     id: 4
  //   }
  // })

  // console.log('delBlogRes', delBlogRes > 0)

  // 删除一个用户
  const delUserRes = await User.destroy({
    where: {
      id: 1,
    }
  })
  console.log('delUserRes', delUserRes)

})();