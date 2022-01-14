const { loginCheck } = require('../../middlewares/loginChecks');
const koaForm = require('formidable-upload-koa');
const { saveFile } = require('../../controller/utils');

/**
 * @description utils api
 */
const router = require('koa-router')();

router.prefix('/api/user')

// 上传图片
router.post('/upload', loginCheck, koaForm(), async(ctx, next) => {
  // ctx.req.files 中间件为你保存的文件
  const file = ctx.req.files['file'];
  const { size, path, name, type } = file;
  // controller
  ctx.body = await saveFile({name, type, size, filePath: path})
})


module.exports = router;