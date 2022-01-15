/**
 * @description utils controller
 */

const { ErrorModel, SuccessModel } = require("../model/ResModel")
const fse = require('fs-extra');
const path = require('path');

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
})

// 文件最大体积是1M
const MAX_SIZE = 500 * 1024 * 1024
async function saveFile({name, type, size, filePath}) {
  if (size > MAX_SIZE) {
    // 删除内存文件
    await fse.remove(filePath)
    return new ErrorModel({
      errno: -1, 
      message: '文件太大了~'
    })
  }

  // 移动文件
  let fileName = Date.now() + '.' + name; // 防止重名覆盖
  let distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fse.move(filePath, distFilePath);

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}


module.exports = {
  saveFile,
}