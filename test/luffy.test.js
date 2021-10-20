const expect = require('chai').expect;
const LuffyThree = require('../index');
const email = 'shangzhibo@upai.com';
const password = 'shangzhibo';
const baseUrl = 'http://10.0.6.27:30081/api/v2.1';
const projectId = '142'; // emma
const appId = 'waston';

describe('LuffyThree test', () => {

  describe('post', () => {
    it('获取token', async function () {
      const Luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await Luffy3.updateToken();
      expect(res).to.be.a('string');
    });

    it('创建服务统一入口', async function () {
      const options = {
        "kind": "Deployment",
        "name": "emma-1",
        "description": "创建服务接口测试",
        "replicas": 1,
        "minReadySeconds": 0,
        "podConfig": {
            "containers": [
                {
                    "cpuRequest": 0.1,
                    "cpuLimit": 1,
                    "image": "10.0.5.14:30443/szbo/alpine:latest",
                    "imagePullPolicyAlways": true,
                    "memoryRequest": 107374182,
                    "memoryLimit": 1073741824,
                    "name": "nl5aiUy7nz",
                    "gpuMemory": 0,
                    "netIntCard": false,
                    "ports": [],
                    "command": "",
                    "envFrom": [],
                    "envs": {},
                    "volumeMounts": []
                }
            ],
            "healthCheck": {},
            "volumeClaims": []
        },
        "deployPolicy": {
            "hostnameUnique": true,
            "nodeSelectorRequirements": []
        }
      };
      const luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await luffy3.createService(projectId, options);
      expect(res).to.be.a('object');
    });

    it('重启指定服务', async function () {
      const luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await luffy3.restartService(projectId, appId);
      expect(res).to.be.a('object');
    });

  });

  describe('get', () =>  {

    it('获取指定项目下的服务列表', async function () {
      const Luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await Luffy3.listService(projectId);
      expect(res).to.be.a('object');
      expect(res.items[0].spec).to.be.a('object');
      expect(res.items[0].spec.name).to.be.a('string');
    });

    it('获取服务的详细信息', async function () {
      const Luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await Luffy3.getService(projectId, appId);
      expect(res).to.be.a('object');
      expect(res.spec).to.be.a('object');
      expect(res.spec.name).to.be.a('string');
    });

    it('获取容器服务实例列表', async function () {
      const luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await luffy3.listPods(projectId, appId);
      expect(res).to.be.a('object');
      expect(res.items).to.be.a('array');
      expect(res.totalItems).to.be.a('number');
    })
  });

  describe('delete', () => {
    it('删除服务', async function () {
      const Luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await Luffy3.destroyService(projectId, 'emma-1');
      expect(res).to.be.a('object');
    });
  });

})
