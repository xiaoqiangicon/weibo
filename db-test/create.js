// insert into 语句
const { Blog, User } = require('./model');

!(async function() {

  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: 'zhangsan'
  });

  console.log('zhangsan: ', zhangsan.dataValues);
  const zhangsanId = zhangsan.dataValues.id;

  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: 'lisi',
  })

  const lisiId = lisi.dataValues.id;

  // 创建博客
  const blog1 = await Blog.create({
    title: 'title1',
    content: 'content1',
    userId: zhangsanId
  })

  console.log('blog1', blog1.dataValues);

  const blog2 = await Blog.create({
    title: 'title2',
    content: 'content2',
    userId: zhangsanId
  })

  const blog3 = await Blog.create({
    title: 'title3',
    content: 'content3',
    userId: lisiId
  })
  const blog4 = await Blog.create({
    title: 'title4',
    content: 'content4',
    userId: lisiId
  })

})();

