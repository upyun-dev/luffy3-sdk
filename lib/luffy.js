'use strict';

const got = require('got');
const crypto = require('crypto');
const sign = require('./sign');

class LuffyThree {

  /**
   * [constructor description]
   * @param {string} email          [用户名] - 废弃
   * @param {string} password       [用户密码] - 废弃
   * @param {string} baseUrl        [基础 url]
   * @param {string} accessKey      [账户密钥名称]
   * @param {string} accessSecret   [账户密钥]
   */
  constructor(baseUrl, accessKey, accessSecret) {
    this.BASE_URL = baseUrl;
    this.accessKey = accessKey;
    this.accessSecret = accessSecret;
    this.rp = got.extend({
      prefixUrl: this.BASE_URL,
      responseType: 'json',
      resolveBodyOnly: true,
      hooks: {
        beforeRequest: [
          async (request) => {
            let opt = {};
            request.searchParams.forEach((value, key) => {
              opt[key] = value;
            });
            const {timestamp, CanonicalizedQueryString} = sign.getCanonicalizedQueryString(this.accessKey, opt);
            const signature = sign.getSignature(request.method, request.url.pathname,{CanonicalizedQueryString, accessSecret: this.accessSecret});
            console.log(signature);
            const params = 'accessKey=' + accessKey + '&' + 'timestamp=' + timestamp + '&' + 'signature=' + signature;
            request.url.search += '&' + params;
            request.searchParams = request.url.searchParams;
            console.log(request.url);
          },
        ],
      },
      mutableDefaults: true,
    });
  }
}


LuffyThree.prototype.ping = async function(options = {}) {
  return this.rp({
    method: 'GET',
    url: 'ping',
    searchParams: options,
  })
}


/**
 * @description 获取项目下的所有服务
 * @param {string} project - 项目编号
 * @param {*} options
 * @returns
 */
LuffyThree.prototype.listService = async function (project, options = {}) {
  console.log('options: ', options);
  return this.rp({
    method: 'GET',
    url: `project/${project}/containerapps`,
    searchParams: options,
  });
};



/**
 * @description 获取服务详细信息
 * @param {string} project - 项目编号
 * @param {string} app     - 服务名
 * @returns {object}
 */
LuffyThree.prototype.getService = async function (project, app, options = {}) {
  return this.rp({
    method: 'GET',
    url: `project/${project}/containerapp/${app}`,
    searchParams: options,
  });
};

/**
 * @description 创建服务统一接口
 * @param {string} project - 项目编号
 * @param {*} options
 * @returns
 */
LuffyThree.prototype.createService = async function (project, options = {}) {
  return await this.rp({
    method: 'POST',
    url: `project/${project}/containerapps`,
    json: options,
  });
};

/**
 * @description 删除服务
 * @param {string} project - 项目编号
 * @param {string} app     - 服务名
 * @returns
 */
LuffyThree.prototype.destroyService = async function (project, app) {
  return await this.rp({
    method: 'DELETE',
    url: `project/${project}/containerapp/${app}`,
  });
};

/**
 * @description 重新启动指定服务
 * @param {string} project - 项目编号
 * @param {string} app     - 服务名
 * @returns
 */
LuffyThree.prototype.restartService = async function (project, app) {
  return await this.rp({
    method: 'POST',
    url: `project/${project}/containerapp/${app}/restart`,
  });
};

/**
 * @description 获取容器服务实例列表
 * @param {string} project - 项目编号
 * @param {string} app     - 服务名
 * @param {object} options
 * @returns
 */
LuffyThree.prototype.listPods = async function (project, app, options = {}) {
  return await this.rp({
    method: 'GET',
    url: `project/${project}/containerapp/${app}/pods`,
    searchParams: options,
  });
};

module.exports = LuffyThree;
