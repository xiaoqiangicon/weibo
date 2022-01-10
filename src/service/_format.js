/**
 * @description 数据格式化
 */

function _formateUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = '***'
  }
  return obj;
}

function formateUser(list) {
  if (list == null) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formateUserPicture)
  }

  // 单个对象
  return _formateUserPicture(list);
}

module.exports = {
  formateUser,
}