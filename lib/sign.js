const percentEncode = require('encode-3986');
const utils = require('./utils');
const utf8 = require('utf8');

/**
 * generate signature string which can be used in head sign or body sign
 * @param {string} method 请求方式，如：GET、POST、PUT、HEAD 等
 * @param {string} pathname 请求路径
 * @param {{}} options 
 * @param {string} options.accessKey keyName
 * @param {string} options.secretAccessKey key
 * @param {string} options.CanonicalizedQueryString 规范化请求字符串
 * @return {string} Signature
 */
function getSignature(method, pathname, options = {}) {
    const StringToSign = method + '&' + percentEncode(pathname) + '&' + percentEncode(options.CanonicalizedQueryString);
    return utils.base64HmacSha1(utf8.encode(StringToSign), options.accessSecret);
}

/**
 * @description 构造规范化请求字符串
 * @param {Object} options 请求参数和参数取值，不包括公共请求参数 signature
 * @return {String} CanonicalizedQueryString
 */
function getCanonicalizedQueryString(accesskey, options = {}) {
    options.timestamp = new Date().toISOString().slice(0, -5) + 'Z';
    // options.timestamp = '2006-01-02T15:04:05Z'; // 单元测试案例
    options.accessKey = accesskey;
    let queryString = Object.keys(options).filter(key => {
        return options[key] != undefined && options[key] !== '' && ['signature'].indexOf(key) < 0;
    }).sort().map(key => {
        return key + '=' + percentEncode(options[key]);
    }).join('&');
    return {timestamp: options.timestamp, CanonicalizedQueryString: queryString};
}

module.exports = {
    getSignature,
    getCanonicalizedQueryString,
}