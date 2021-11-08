## Luffy SDK package

### Import and constructor

```JavaScript
const Luffy3 = require('luffy3-sdk');
const luffy3 = new Luffy3(baseUrl, accessKey, accessSecret);
```

### Methods

#### 1. 获取token

```JavaScript
/**
 * @return  {string}
 */
luffy3.updateToken();
```
#### 2. 获取项目下的服务列表

```JavaScript
/**
 * @param   {String}  projectId    project id
 * @return  {}
 */
luffy3.listService(projectId);
```

#### 3.获取服务的详细信息

```JavaScript
/**
 * @param   {String}  projectId    project id
 * @param   {String}  appId        服务名
 * @return  {object}
 */
luffy3.getService(projectId, appId);
```
#### 4.获取容器服务实例列表

```JavaScript
/**
 * @param   {String}  projectId    project id
 * @param   {String}  appId        服务名
 * @return  {object}
 */
luffy3.listPods(projectId, appId)
```
#### 5.创建服务统一入口

```JavaScript
/**
 * @param   {String}  projectId    project id
 * @param   {Object}  options      body参数
 * @return  {}
 */
luffy3.createService(projectId, options);
```
#### 6.重启指定服务

```JavaScript
/**
 * @param   {String}  projectId    project id
 * @param   {String}  appId        服务名
 * @return  {object}
 */
luffy3.restartService(projectId, appId);
```
#### 7.删除服务

```JavaScript
/**
 * @param   {String}  projectId    project id
 * @param   {String}  appId        服务名
 * @return  {object}
 */
luffy3.destroyService(projectId, appId);
```
...


### 单元测试
```cmd
npm test
```

