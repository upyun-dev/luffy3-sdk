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
            if (request.searchParams) {
              request.searchParams.forEach((value, key) => {
                opt[key] = value;
              });
            }
            const {timestamp, CanonicalizedQueryString} = sign.getCanonicalizedQueryString(this.accessKey, opt);
            const signature = sign.getSignature(request.method, request.url.pathname,{CanonicalizedQueryString, accessSecret: this.accessSecret});

            const params = 'accessKey=' + accessKey + '&' + 'timestamp=' + timestamp + '&' + 'signature=' + signature;
            request.url.search += '&' + params;
            request.searchParams = request.url.searchParams;
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
 * 
 * @param {string} project 项目编号
 * @param {object} options cronjob 配置
 * @example options = {
  "activeDeadlineSeconds": 0,
  "backoffLimit": 0,
  "concurrencyPolicy": "Allow",
  "containers": [
    {
      "command": "string",
      "cpuLimit": 0,
      "cpuRequest": 0,
      "envFrom": [
        "string"
      ],
      "envs": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "gpuMemory": 0,
      "image": "string",
      "imagePullPolicyAlways": true,
      "memoryLimit": 0,
      "memoryRequest": 0,
      "netIntCard": true,
      "ports": [
        0
      ],
      "volumeMounts": [
        {
          "mountPath": "string",
          "name": "string",
          "subPath": "string",
          "volumeKind": "Config"
        }
      ]
    }
  ],
  "createAt": "2021-05-25T16:00:00+08:00",
  "description": "string",
  "jobsHistoryLimit": 0,
  "kind": "Deployment",
  "name": "nginx",
  "policy": {
    "hostnameUnique": true,
    "nodeSelectorRequirements": [
      {
        "key": "string",
        "values": [
          "string"
        ]
      }
    ]
  },
  "schedule": "string",
  "suspend": true,
  "updateAt": "2021-05-25T16:00:00+08:00"
}
 * @returns 
 */
LuffyThree.prototype.createSchedulesService = async function (project, options = {}) {
  return await this.rp({
    method: 'POST',
    url: `project/${project}/cronjobs`,
    json: options,
  });
}

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

LuffyThree.prototype.triggerNow = async function(project, cronjobName) {
  return await this.rp({
    method: 'POST',
    url: `project/${project}/cronjob/${cronjobName}/trigger`,
  });
}

module.exports = LuffyThree;
