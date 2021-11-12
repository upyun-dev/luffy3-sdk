const expect = require('chai').expect;
const LuffyThree = require('../index');
const email = 'shangzhibo@upai.com';
const password = 'shangzhibo';
const baseUrl = 'http://10.0.6.27:30081/api/v2.1';
const projectId = '142'; // emma 142
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

      const opt = {
        name: 'emmaa',
        kind: 'Deployment',
        description: `123456789`,
        deployPolicy: {
          hostnameUnique: true,
          nodeSelectorRequirements: [
            {
              key: "kubernetes.io/hostname",
              values: ["ceph-test-02"]
            },
          ],
        },
        replicas: 1,
        podConfig: {
          containers: [
            {
              cpuRequest: 0.1,
              cpuLimit: 1,
              image: 'hub.upyun.com/shangzhibo/onelive-ffmpeg:v0.1.3',
              name: '123456',
              imagePullPolicyAlways: true,
              memoryRequest: 268435456,
              memoryLimit: 268435456,
              gpuMemory: 0,
              netIntCard: false,
              ports: [],
              command: 'bash -c ' + 'node',
              envFrom: [],
              envs: {},
              volumeMounts: [],
            },
          ],
        },
      };
      const taskId = 123456;
      const activityId = '0000000';
      const type = 'push';
      const opt1 = {
        name: `ingest-${taskId}`,
        kind: 'Deployment',
        description: `活动 ${activityId} ${type === 'pull' ? '拉' : '推'}流容器`,
        deployPolicy: {
          hostnameUnique: false,
          nodeSelectorRequirements: [],
        },
        replicas: 1,
        podConfig: {
          containers: [
            {
              cpuRequest: 1,
              cpuLimit: 1,
              image: '10.0.5.14:30443/szbo/alpine:latest',
              name: 'onelive-ffmpeg-1',
              imagePullPolicyAlways: true,
              memoryRequest: 268435456,
              memoryLimit: 268435456,
              gpuMemory: 0,
              netIntCard: false,
              ports: [],
              command: 'bash -c ' + 'command',
              envFrom: [],
              envs: {},
              volumeMounts: [],
            },
          ],
        },
      };
      
      const opt2 = {
        "kind": "Deployment",
        "name": "123123",
        "description": "个地方过分的",
        "replicas": 1,
        "minReadySeconds": 0,
        "podConfig": {
            "containers": [
                {
                    "cpuRequest": 0.1,
                    "cpuLimit": 1,
                    "image": "hub.upyun.com/shangzhibo/onelive-ffmpeg:v0.1.3",
                    "imagePullPolicyAlways": true,
                    "memoryRequest": 107374182,
                    "memoryLimit": 1073741824,
                    "name": "6xKETsNA2O",
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
            "volumeClaims": null,
            "terminationGracePeriodSeconds": 30
        },
        "deployPolicy": {
            "hostnameUnique": false,
            "nodeSelectorRequirements": []
        }
      };

      const opt3 = {
        "kind":"Deployment",
        "name":"00000",
        "description":"1231231",
        "replicas":1,
        "minReadySeconds":0,
        "podConfig":{
            "containers":[
                {
                    "cpuRequest":0.1,
                    "cpuLimit":1,
                    "image":"10.0.5.14:30443/szbo/alpine:latest",
                    "imagePullPolicyAlways":true,
                    "memoryRequest":107374182,
                    "memoryLimit":1073741824,
                    "name":"xsPQx3POgM",
                    "gpuMemory":0,
                    "netIntCard":false,
                    "ports":[
    
                    ],
                    "command":"",
                    "envFrom":[
    
                    ],
                    "envs":{
    
                    },
                    "volumeMounts":[
    
                    ]
                }
            ],
            "healthCheck":{
    
            },
            "volumeClaims":null,
            "terminationGracePeriodSeconds":30
        },
        "deployPolicy":{
            "hostnameUnique":false,
            "nodeSelectorRequirements":[
    
            ]
        }
      };
      const opt4 = {
        kind: 'CronJob',
        name: '123456',
        description: '123456',
        containers: [
          {
            cpuRequest: 0.1,
            cpuLimit: 1,
            image: '10.0.5.14:30443/szbo/alpine:latest',
            imagePullPolicyAlways: true,
            memoryRequest: 107374182,
            memoryLimit: 1073741824,
            name: 'onelive-ffmpeg-1',
            command: 'echo aaa',
            envFrom: [],
            envs: {},
            volumeMounts: [],
          },
        ],
        activeDeadlineSeconds: 600,
        backoffLimit: 3,
        policy: {
          nodeSelectorRequirements: [],
        },
        schedule: '*/1 * * * *',
        concurrencyPolicy: 'Replace',
        jobsHistoryLimit: 5,
        suspend: true,
      };
      const luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await luffy3.createService(projectId, options);
      expect(res).to.be.a('object');
    });

    it('创建定时任务', async function () {
      const options = {
        "kind": "CronJob",
        "name": "00000",
        "description": "000000",
        "containers": [
            {
                "cpuRequest": 0.1,
                "cpuLimit": 1,
                "image": "10.0.5.14:30443/szbo/alpine:latest",
                "imagePullPolicyAlways": true,
                "memoryRequest": 107374182,
                "memoryLimit": 1073741824,
                "name": "fKdmpQDN5x",
                "command": "/bin/bash -c \"while true; do sleep 1; done\"",
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
      const opt = {
        name: `tasks-${123123}`,
        kind: 'CronJob',
        description: '123123123',
        containers: [
          {
            cpuRequest: 0.1,
            cpuLimit: 1,
            image: '10.0.5.14:30443/szbo/alpine:latest',
            imagePullPolicyAlways: true,
            memoryRequest: 107374182,
            memoryLimit: 1073741824,
            name: 'onelive-1',
            command: `node server/tasks/index -t ${String(123)}`,
            envFrom: [],
            envs: {NODE_ENV: 'production', TZ: 'Asia/Shanghai'},
            volumeMounts: [],
          },
        ],
        policy: {
          nodeSelectorRequirements: [],
    
        },
        replicas: 1,
        backoffLimit: 0,
        schedule: '*/1 * * * *',
        concurrencyPolicy: 'Forbid',
      };
      const luffy3 = new LuffyThree(email, password, baseUrl);
      const res = await luffy3.createSchedulesService(projectId, options);
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
