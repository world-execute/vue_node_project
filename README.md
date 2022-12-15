# 物资分配管理系统接口文档
## 简介
使用Node.js+express+Mongoose开发,将用于之后Vue项目的后端接口服务器   
### 环境配置
> `Node.js`运行环境,版本`14.20.0`   
> `MongoDB`数据库,版本`4.2.22`
### 相关插件介绍
> | npm仓库名|版本|简介|
> | :-:|---|---|
> | cors|2.8.5|添加响应头解决跨域问题
> | joi| 17.7.0| 对请求数据进行验证
> | express-joi | 1.1.1 | 中间件,用于对请求数据拦截进行验证
> | mongoose | 6.8.0 | 提供类似数据库映射的服务
---
## 接口说明
> 基准地址  http://localhost:8080/api 或 http://127.0.0.1:8080/api   
> 除了用于登录和注册的接口,其余接口需要进行Token验证
## 1.用户接口
---
### 1.1新增用户
请求方法 `POST`  
请求路径 `user`   
>请求参数   
>| 参数名 | 参数类型 | 可否为空 | 备注 |   
>| --- | --- | --- | --- |
>| username | String | no |   
>| password | String | no |   

>响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| username | String 
>| real_name | String | 真实姓名 | 空字符串　
>| address | String | 地址 | 同上
>| phone | String | 手机号码 | 同上
>| ration | Number | 用户配额 | 10
>| apply_supplies | Array | 申请物资id数组 | [ ]
>| apply_ration | Array | 申请变更配额id数组 | [ ]
>| type | Number | 用户权限组 | 1
>| is_delete | Boolean | 用户软删除 | false
>| create_time | Date | 用户创建时间 | Date.now()

响应示例
``` js
{
    "msg": "创建用户成功",
    "status": 201,
    "data": {
        "username": "erxeuxa",
        "password": "cxddzeuusg",
        "real_name": "",
        "address": "",
        "phone": "",
        "ration": 10,
        "apply_supplies": [],
        "apply_ration": [],
        "type": 1,
        "is_delete": false,
        "create_time": "2022-12-15T14:35:35.124Z",
        "_id": "639b30d7d1e62ddb892b4ff1"
    }
}
```
---
### 1.2 获取用户数据
请求方式 `GET`   
请求路径 `user`  
> 请求参数
> | 参数名 | 参数类型 | 可否为空 | 备注 |   
> | --- | --- | --- | --- |
> | page_num | Number | no | 分页页码
> | page_size | Number | no | 分页大小  

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| users | Array | 包含用户数据的数组
>| total | Number | 用户数据的总量

响应示例
``` js
{
    "msg": "获取用户成功",
    "status": 200,
    "data": {
        "users": [...],
        "total":20
    }
}
```
---
### 1.3获取指定ID用户
请求方式 `GET`
请求路径 `user/:id`
> 请求参数
> | 参数名 | 参数类型 | 可否为空 | 备注 |   
> | --- | --- | --- | --- |
> |id | String | no | 放置于URL中

> 响应参数  
> 与1.1相同

响应示例   
与1.1相同
