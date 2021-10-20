'use strict';

const got = require('got');
const crypto = require('crypto');

class LuffyThree {

  /**
   * [constructor description]
   * @param {string} email          [用户名]
   * @param {string} password       [用户密码]
   * @param {string} baseUrl        [基础 url]
   */
  constructor(email, password, baseUrl) {
    this.email = email;
    this.password = password;
    this.BASE_URL = baseUrl;
    this.rp = got.extend({
      prefixUrl: this.BASE_URL,
      responseType: 'json',
      resolveBodyOnly: true,
      hooks: {
        afterResponse: [
          async (response, retryWithMergedOptions) => {
            if (response.statusCode === 401) {
              const updatedOptions = {
                headers: {
                  jweToken: await this.updateToken(), // Refresh the access token
                },
              };
              this.rp.defaults.options = got.mergeOptions(this.rp.defaults.options, updatedOptions);
              return retryWithMergedOptions(updatedOptions);
            }
            return response;
          },
        ],
      },
      mutableDefaults: true,
    });
  }
}

LuffyThree.prototype.updateToken = async function () {
  const result = await got.post(`${this.BASE_URL}/login`, {
    json: {
      email: this.email,
      password: crypto.createHash('md5').update(this.password, 'utf8').digest('hex'),
    },
    resolveBodyOnly: true,
    responseType: 'json',
  });
  return result.jweToken;
};

/**
 * @description 获取项目下的所有服务
 * @param {string} project - 项目编号
 * @param {*} options
 * @returns
 */
LuffyThree.prototype.listService = async function (project, options = {}) {
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
