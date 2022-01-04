/**
 * @description 连接redis 的方法 get set
 * @author lee
 */

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', err=> {
  console.error('redis err', err);
})

// set
/**
 * 
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 过期时间，单位s 
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

// get
/**
 * 
 * @param {string} key 键 
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val);
      }
    });
  });

  return promise;
}

exports.module = {
  get,
  set,
}