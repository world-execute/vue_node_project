# 物资分配管理系统接口文档
## 简介
使用Node.js+express+Mongoose开发,将用于之后Vue项目的后端接口服务器   
### 环境配置
> `Node.js`运行环境,版本`14.20.0`   
> `MongoDB`数据库,版本`4.2.22`
### Express相关插件介绍
> | npm仓库名|版本|简介|
> | :-:|---|---|
> | cors|2.8.5|添加响应头解决跨域问题
> | joi| 17.7.0| 对请求数据进行验证
> | express-joi | 1.1.1 | 中间件,用于对请求数据拦截进行验证
> | mongoose | 6.8.0 | 提供类似数据库映射的服务
> | bcryptjs | 2.4.3 | 用于加密敏感数据,基于加盐的hash算法
> | jsonwebtoken | 8.5.1 |用于生成JWT字符串
> | express-jwt | 7.7.7 | 解析客户端发来的JWT字符串
---
## 接口说明
> 基准地址  http://localhost:8080/api 或 http://127.0.0.1:8080/api   
> 除了用于登录和注册的接口,其余接口需要进行Token验证

> 响应中状态响应码相关含义  
>| 状态码 | 一般含义 |   
>| :-: | --- | 
>| 200 | 资源请求成功 |
>| 201 | 成功创建新的资源 |
>| 400 | 请求失败 |
>| 401 | 用户身份验证失败 |
>| 403 | 理解请求,但是没有执行 |
>| 500 | 服务器内部错误 |
---
## 1 用户接口
---
### 1.1 新增用户
请求方法 `POST`  请求路径 `user`   
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
>| username | String | 用户名 |
>| real_name | String | 真实姓名 | 空字符串　
>| address | String | 地址 | 同上
>| phone | String | 手机号码 | 同上
>| ration | Number | 用户配额 | 10
>| apply_supplies | Array | 申请物资id数组 | [ ]
>| apply_ration | Array | 申请变更配额id数组 | [ ]
>| avatar | String | 用户头像url | 空字符串
>| is_delete | Boolean | 用户软删除 | false
>| create_time | Date | 用户创建时间 | Date.now()

响应示例
``` js
{
    "msg": "创建用户成功",
    "status": 201,
    "data": {
        "username": "erxeuxa",
        "real_name": "",
        "address": "",
        "phone": "",
        "ration": 10,
        "apply_supplies": [],
        "apply_ration": [],
        "avatar": '',
        "is_delete": false,
        "create_time": "2022-12-15T14:35:35.124Z",
        "_id": "639b30d7d1e62ddb892b4ff1"
    }
}
```
---
### 1.2 获取用户数据
请求方式 `GET`   请求路径 `user`  
说明:模糊查询支持查询真实姓名,用户名或手机号
> 请求参数
> | 参数名 | 参数类型 | 可否为空 | 备注 |   
> | --- | --- | --- | --- |
> | query | String | yes | 模糊查询关键字
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
### 1.3 获取指定ID用户
请求方式 `GET`
请求路径 `user/:id`
> 请求参数
> | 参数名 | 参数类型 | 可否为空 | 备注 |   
> | --- | --- | --- | --- |
> |id | String | no | 放置于URL中

> 响应参数  
> 与1.1相同
 
响应示例
``` js
{
    "msg": "获取用户成功",
    "status": 200,
    "data": {
        "username": "erxeuxa",
        "real_name": "",
        "address": "",
        "phone": "",
        "ration": 10,
        "apply_supplies": [],
        "apply_ration": [],
        "avatar": '',
        "is_delete": false,
        "create_time": "2022-12-15T14:35:35.124Z",
        "_id": "639b30d7d1e62ddb892b4ff1"
    }
}
```
---
### 1.4 修改用户信息
请求方式 `PUT`
请求路径 `user/:id`  
说明:该接口只能用于修改用户部分数据,且使用ID寻找用户,用于完善用户信息,或设置用户字段is_delete为true以删除用户
> 请求参数
> | 参数名 | 参数类型 | 可否为空 | 备注 |   
> | --- | --- | --- | --- |
> |id | String | no | 放置于URL中
> | real_name | String | yes|真实姓名 
> | address | String | yes|地址 
> | phone | String | yes|手机号码 
> | avatar | String | yes | 空字符串
> | is_delete | String | yes | 标志用户被删除

> 响应参数  
> 与1.1相同
> 返回的是修改之后的数据
 
响应示例
``` js
{
    "msg": "修改用户成功",
    "status": 201,
    "data": {
        "_id": "639b277896b410885dc9ade5",
        "username": "lqghrd",
        "real_name": "卢勇",
        "address": "浙江省 湖州市",
        "phone": "18124412776",
        "ration": 10,
        "apply_supplies": [],
        "apply_ration": [],
        "avatar": '',
        "is_delete": true,
        "create_time": "2022-12-15T13:55:52.796Z"
    }
}
```
### 1.5 永久删除用户
请求方式 `DELETE`
请求路径 `user/:id`  
说明:此举将用户永久从数据库中移除,无法恢复,业务中应先考虑使用软删除,即修改用户is_delete字段为true
> 请求参数
> | 参数名 | 参数类型 | 可否为空 | 备注 |   
> | --- | --- | --- | --- |
> |id | String | no | 放置于URL中

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| deletedCount | Number | 删除文档数

响应示例
```js
{
    "msg": "永久删除成功",
    "status": 201,
    "data": {
        "deletedCount": 1
    }
}
```
---
### 1.6 批量删除用户
请求方式 `DELETE`
请求路径 `user`
说明:用于批量删除已标记用户字段is_delete为true的用户数据
此举将永久将用户从数据库中移除
> 请求参数
> 无

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| deletedCount | Number | 删除文档数

响应示例
``` js
{
    "msg": "永久删除成功",
    "status": 201,
    "data": {
        "deletedCount": 10
    }
}
```
---
## 2 物资分类接口
---
### 2.1 新增物资分类
请求方式 `POST` 请求路径 `categories`
说明:用于新增父级分类时可以只传递参数name,但新增子级分类时, 需要传递参数name,level,pid,且level为1,pid为该子级分类的父级id
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| name | String | no |分类名称
>| level | String | yes |分类等级 | 0(代表了父类)
>| pid | String | yes |父级分类id 

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 新建分类的信息

响应示例
``` js
{
    "msg": "创建分类成功",
    "status": 201,
    "data": {
        "name": "食品",
        "level": 0,
        "_id": "63b6d66ec1e003b9e7651ac6"
    }
}
```
---
### 2.2 获取分类数据
请求方式 `GET` 请求路径 `categories`   
说明:支持分类名称模糊查询,只需要传递query参数,不传递时返回所有分类,子分类将会自动包含在父分类的children对象中,以数组的形式保存
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| query | String | yes | 用于查询分类名称

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 获取分类的信息
>| name | String |分类名称
>| level | String |分类等级 | 0(代表了父类)
>| pid | String |父级分类id 
>| children | Array | 子级分类数据

响应示例
``` js
{
    "msg": "ok",
    "status": 200,
    "data": [
        {
            "_id": "63b1a10c0f4eb87f77441129",
            "name": "药品",
            "level": 0,
            "children": [
                {
                    "_id": "63b2f2cabd7c9300636bd500",
                    "name": "退烧药",
                    "level": 1,
                    "pid": "63b1a10c0f4eb87f77441129"
                },
                {
                    "_id": "63b2f2cfbd7c9300636bd502",
                    "name": "感冒药",
                    "level": 1,
                    "pid": "63b1a10c0f4eb87f77441129"
                }
            ]
        },
        {
            "_id": "63b2f21cbd7c9300636bd4f4",
            "name": "日用品",
            "level": 0,
            "children": [
                {
                    "_id": "63b2f315bd7c9300636bd506",
                    "name": "洗漱用品",
                    "level": 1,
                    "pid": "63b2f21cbd7c9300636bd4f4"
                }
            ]
        }
    ]
}
```
### 2.3 修改指定ID的分类信息
请求方式 `PUT` 请求路径 `categories`   
说明:只可以修改分类名称
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| id | String | no | 修改分类的id,包含在URL中
>| name | String | no | 分类名称

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 获取分类的信息

响应示例
``` js
{
    "msg": "修改分类成功",
    "status": 201,
    "data": {
        "_id": "63b2f19c42102293782b2a3a",
        "name": "食品",
        "level": 0
    }
}
```
---
### 2.4 删除指定ID的分类
请求方式 `DELETE` 请求路径 `categories`   
说明:当删除的分类是一个父级分类时,其子级分类都将被删除
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| id | String | no | 删除分类的id,包含在URL中

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 删除的分类的信息

响应示例
``` js
{
    "msg": "删除分类成功",
    "status": 200,
    "data": {
        "_id": "63b2f276bd7c9300636bd4f6",
        "name": "罐头",
        "level": 1,
        "pid": "63b2f19c42102293782b2a3a"
    }
}
```
---
## 物资接口
---
### 2.1 新增物资
请求方式 `POST` 请求路径 `material`   
说明:
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>|name | String | no | 物资名称
>|quantity| NUmber | no | 物资数量
>|price| Number | no | 物资单价
>|type| String | no | 物资类别(对应分类的id)
>|threshold| Number | no | 物资阈值

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 删除的分类的信息
>|name | String | 物资名称
>|quantity| NUmber | 物资数量
>|price| Number  | 物资单价
>|type| String  | 物资类别(对应分类的id)
>|threshold| Number  | 物资阈值
>|change_time|String | 物资修改时间(包含第一次创建)

响应示例
``` js
{
    "msg": "物资创建成功",
    "status": 201,
    "data": {
        "name": "土豆",
        "quantity": 200,
        "price": 6,
        "type": "63b2f298bd7c9300636bd4fa",
        "threshold": 100,
        "change_time": "2023-01-05T14:38:01.120Z",
        "_id": "63b6e292885955107f819696"
    }
}
```