const expect = require('chai').expect;
const LuffyThree = require('../index');
const sign = require('../lib/sign');
const email = 'shangzhibo@upai.com';
const password = 'shangzhibo';
const baseUrl = 'http://10.0.6.27:30081/api/v2.1';
const projectId = '142'; // emma
const appId = 'waston';
const accessKey = 'JtLzjiUGccsn74pxh42hGT52';
const accessSecret = 'Sdj20xEjDlTeBs1iMbEM0R8i07Ndeb';

describe('LuffyThree test', () => {

  describe('post', () => {

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
      const luffy3 = new LuffyThree(baseUrl, accessKey, accessSecret);
      const res = await luffy3.createService(projectId, options);
      expect(res).to.be.a('object');
    });

    it('创建定时任务', async function () {
      const options = {
        "kind": "CronJob",
        "name": "emmaWWcom",
        "description": "封装接口 创建的测试",
        "containers": [
            {
                "cpuRequest": 0.1,
                "cpuLimit": 1,
                "image": "10.0.5.14:30443/szbo/alpine:latest",
                "imagePullPolicyAlways": true,
                "memoryRequest": 107374182,
                "memoryLimit": 1073741824,
                "command": "/bin/bash -c \"while true; do sleep 1; done\" ",
                "envFrom": [],
                "envs": {},
                "volumeMounts": [
                    {
                        "mountPath": "/temp",
                        "name": "emma-data",
                        "volumeKind": "PVC"
                    }
                ]
            }
        ],
        "activeDeadlineSeconds": 600,
        "backoffLimit": 3,
        "policy": {
            "nodeSelectorRequirements": []
        },
        "schedule": "*/1 * * * *",
        "concurrencyPolicy": "Forbid",
        "jobsHistoryLimit": 5,
        "suspend": false
      };
      const luffy3 = new LuffyThree(baseUrl, accessKey, accessSecret);
      const res = await luffy3.createSchedulesService(projectId, options);
      expect(res).equal('{}');
    });

    it('重启指定服务', async function () {
      const luffy3 = new LuffyThree(baseUrl, accessKey, accessSecret);
      const res = await luffy3.restartService(projectId, appId);
      expect(res).to.be.a('object');
    });

  });

  describe('get', () =>  {

    it('验证算法是否正确', async () => {
      const {CanonicalizedQueryString} = sign.getCanonicalizedQueryString('myKey123');
      const options = {
        CanonicalizedQueryString: CanonicalizedQueryString,
        accessSecret: 'mySecret123'
      };
      const signature = sign.getSignature('GET', '/api/v1/ping', options);
      expect(CanonicalizedQueryString).equal('accessKey=myKey123&timestamp=2006-01-02T15%3A04%3A05Z');
      expect(signature).equal('uiGTWIFb0WNE1hFumszb8IxRRlU=');
    });
    it('获取指定项目下的服务列表', async function () {
      const Luffy3 = new LuffyThree(baseUrl, accessKey, accessSecret);
      const res = await Luffy3.listService(projectId, {page: 1, itemsPerPage: 10});
      expect(res).to.be.a('object');
      expect(res.items[0].spec).to.be.a('object');
      expect(res.items[0].spec.name).to.be.a('string');
    });

    it('获取服务的详细信息', async function () {
      const Luffy3 = new LuffyThree(baseUrl, accessKey, accessSecret);
      const res = await Luffy3.getService(projectId, appId);
      expect(res).to.be.a('object');
      expect(res.spec).to.be.a('object');
      expect(res.spec.name).to.be.a('string');
    });

    it('获取容器服务实例列表', async function () {
      const Luffy3 = new LuffyThree(baseUrl, accessKey, accessSecret);
      const res = await Luffy3.listPods(projectId, appId, {page: 1, itemsPerPage: 10});
      expect(res).to.be.a('object');
      expect(res.items).to.be.a('array');
      expect(res.totalItems).to.be.a('number');
    })
  });

  describe('delete', () => {
    it('删除服务', async function () {
      const Luffy3 = new LuffyThree(baseUrl, accessKey, accessSecret);
      const res = await Luffy3.destroyService(projectId, 'emma-1');
      expect(res).to.be.a('object');
    });
  });

})
