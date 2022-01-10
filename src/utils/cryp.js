/**
 * @description 加密方法
 */
const { CRYPTO_SECREATE_KEY } = require('../conf/constant');
const crypto = require('crypto');

// 密钥
const  SECREAT_KEY = CRYPTO_SECREATE_KEY;


/**
 * md5加密
 */
function _md5(content) {
    // content 明文
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

function doCrypto(content) {
    const str = `password=${content}&key=${SECREAT_KEY}`;
    return _md5(str);
}

module.exports = {
    doCrypto
}