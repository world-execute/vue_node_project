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
请求方法 <span style="color:#FF8C00">POST</span> 请求路径 `user`   
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
请求方式 <span style="color:#00FF00">GET</span> 请求路径 `user`  
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
请求方式 <span style="color:#00FF00">GET</span> 
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
请求方式  <span style="color:#00BFFF">PUT</span> 
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
请求方式  <span style="color:#DC143C">DELETE</span> 
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
请求方式  <span style="color:#DC143C">DELETE</span> 
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
请求方式 <span style="color:#FF8C00">POST</span> 请求路径 `categories`   
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
请求方式  <span style="color:#00FF00">GET</span>  请求路径 `categories`   
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
请求方式  <span style="color:#00BFFF">PUT</span>  请求路径 `categories`   
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
请求方式 <span style="color:#DC143C">DELETE</span>  请求路径 `categories`   
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
## 3 物资接口
---
### 3.1 新增物资
请求方式 <span style="color:#FF8C00">POST</span> 请求路径 `material`   
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
---
### 3.2 获取物资信息
请求方式 <span style="color:#00FF00">GET</span>  请求路径 `material`   
说明: 使用分页参数保证数据传输量可控,支持模糊查询物资名称
使用url参数的形式,还可以传入分类的id,返回属于该分类的物资信息,传入lower,无论值为多少,都认为需要返回低于物资数量阈值的物资信息.
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
> | page_num | Number | no | 分页页码
> | page_size | Number | no | 分页大小  
> | query | String | yes | 模糊查询关键字,使用URL参数
> | type | String | yes | 根据分类id返回物资信息,使用url参数
> | lower | any | yes | 返回低于阈值的物资信息,使用URL参数
> |sort | String | yes | 按照时间新旧排序,值为 `old` 或 `new` ,使用url参数

请求示例

>| 作用 | URL地址 | 
>| --- | --- |
>| 获取指定分类的物资 | api/material?type=63b2f298bd7c9300636bd4fa |
>| 按时间从新到旧排序 | api/material?sort=new
>| 获取物资数量低于阈值的物资信息 | api/material?lower=1

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 删除的分类的信息

响应示例
``` js
{
    "msg": "获取物资信息成功",
    "status": 200,
    "data": [
        {
            "_id": "63b6e292885955107f819696",
            "name": "土豆",
            "quantity": 200,
            "price": 6,
            "type": {
                "_id": "63b2f298bd7c9300636bd4fa",
                "name": "蔬菜",
                "level": 1,
                "pid": "63b2f19c42102293782b2a3a"
            },
            "threshold": 100,
            "change_time": "2023-01-05T14:38:01.120Z"
        },
        {
            "_id": "63b2f90af658a9b35825144a",
            "name": "西红柿",
            "quantity": 50,
            "price": 6,
            "type": {
                "_id": "63b2f298bd7c9300636bd4fa",
                "name": "蔬菜",
                "level": 1,
                "pid": "63b2f19c42102293782b2a3a"
            },
            "threshold": 100,
            "change_time": "2023-01-05T13:38:27.312Z"
        }
    ]
}
```
---
### 3.3 修改物资信息
请求方式  <span style="color:#00BFFF">PUT</span>  请求路径 `material/:id`   
说明:用于修改物资的全部信息,包括分类,且每次修改物资信息都会获取最新是时间保存在change_time字段
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| id | String | no | 物资id,放置在URL中
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
>| data | Object | 修改后的物资的信息

响应示例
``` js
{
    "msg": "更新物资信息成功",
    "status": 201,
    "data": {
        "_id": "63b2f90af658a9b35825144a",
        "name": "西红柿",
        "quantity": 500,
        "price": 6,
        "type": "63b2f298bd7c9300636bd4fa",
        "threshold": 100,
        "change_time": "2023-01-07T12:16:50.119Z"
    }
}
```
---
### 3.4 删除物资信息
请求方式  <span style="color:#DC143C">DELETE</span>  请求路径 `material/:id`   
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| id | String | no | 物资id,放置在URL中

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 删除后的物资的信息

响应示例 
``` js
{
    "msg": "删除物资信息成功",
    "status": 201,
    "data": {
        "_id": "63b2f90af658a9b35825144a",
        "name": "西红柿",
        "quantity": 500,
        "price": 6,
        "type": "63b2f298bd7c9300636bd4fa",
        "threshold": 100,
        "change_time": "2023-01-07T12:16:50.119Z"
    }
}
```
---
## 4 物资配送表接口
### 4.1 新增物资配送表接口, 
请求方式 <span style="color:#FF8C00">POST</span> 请求路径 `distribution`   
说明:数据库字段status代表了配送情况,物资信息使用表单数据,由于无法传值数组,所以将数组序列化成元素用 ','间隔的字符串
数据库字段supplies_info其实由supplies_name(物资名称)和supplies_quantities(物资数量)组合而来
>字段status含义
>| 数字 | 含义 |
>|---|---|
>| 0 | 正在审批 | 
>| 1 | 准备物资 | 
>| 2 | 正在配送 | 
>| 3 | 配送完成 |

> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| user_id | String | no | 用户id
>| supplies_names | String | no |物资名称,彼此间用","间隔
>| supplies_quantities | String | no |物资数量,彼此间用 ","间隔

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码 
>| data | Object | 新增的物资配送表信息
>| _id | String | 物资配送表id
>| supplies_info | Array | 物资信息 
>| is_accept | Boolean | 是否批准 | false
>| status | String | 物资配送情况 | 0

响应示例
``` js
{
    "msg": "创建物资配送表成功",
    "status": 200,
    "data": {
        "user_id": "639d58819ee3fb7390b20f5a",
        "supplies_info": [
            {
                "name": "芹菜",
                "quantity": "30"
            },
            {
                "name": "西红柿",
                "quantity": "20"
            },
            {
                "name": "白菜",
                "quantity": "40"
            }
        ],
        "status": 0,
        "is_accept": false,
        "_id": "63bc1d5fd79cfb7937a9ddca",
        "create_time": "2023-01-09T13:57:51.241Z"
    }
}
```
---
### 4.2 获取物资配送表信息
请求方式 <span style="color:#00FF00">GET</span> 
 请求路径 `distribution`   
说明:通过联合查询返回的物资配送表会包含用户信息
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| page_num | String | no | 分页页码
>| page_size | String | no | 分页大小
>| query | String | yes | 查询用户然后返回第一个用户的物资配送表信息
>| user_id | String | yes | 通过用户id精准查询该用户的物资配送表信息,使用URL参数形式
>| accept | String | yes | 获取批准或不批准的物资配送表数据,可取值为 true(批准)\false(不批准),使用URL参数形式
>| status | String | yes | 获取特定状态的物资配送表数据,使用URL参数形式

> 响应参数
>| 参数名 | 参数类型 | 备注 |
>| --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 删除的分类的信息

响应示例
``` js
{
    "msg": "获取物资配送表成功",
    "status": 201,
    "data": [
        {
            "_id": "63bc1d5fd79cfb7937a9ddca",
            "user_id": {
                "_id": "639d58819ee3fb7390b20f5a",
                "username": "yirsgz",
                "real_name": "张三",
                "address": "",
                "phone": "",
                "ration": 10,
                "avatar": "",
                "is_delete": false,
                "create_time": "2022-12-17T05:49:45.268Z"
            },
            "supplies_info": [
                {
                    "name": "芹菜",
                    "quantity": "30"
                },
                {
                    "name": "西红柿",
                    "quantity": "20"
                },
                {
                    "name": "白菜",
                    "quantity": "40"
                }
            ],
            "status": 0,
            "is_accept": false,
            "create_time": "2023-01-09T13:57:51.241Z"
        }
    ]
}
```
### 4.3 修改物资配送表信息
请求方式  <span style="color:#00BFFF">PUT</span> 
请求路径 `distribution`   

> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| id | String | no | 放置在URL中
>| status | String | yes |物资配送状态
>| is_accept | String | yes |是否批准

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 修改后的物资分配表信息

响应示例
``` js
{
    "msg": "修改物资配送表成功",
    "status": 200,
    "data": {
        "_id": "63baae9efb0b344feae50a94",
        "user_id": "639d58819ee3fb7390b20f5a",
        "supplies_info": [
            {
                "name": "苹果",
                "quantity": "10"
            },
            {
                "name": "香蕉",
                "quantity": "20"
            }
        ],
        "status": 2,
        "is_accept": true,
        "create_time": "2023-01-08T11:52:54.042Z"
    }
}
```
### 4.4 删除物资配送表信息
请求方式  <span style="color:#DC143C">DELETE</span>  
请求路径 `distribution`   

> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| id | String | no | 放置在URL中

> 响应参数
>| 参数名 | 参数类型 | 备注  
>| --- | --- | --- |   
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| data | Object | 删除的分类的信息

响应示例
``` js
{
    "msg": "删除物资配送表成功",
    "status": 200,
    "data": {
        "_id": "63baae9efb0b344feae50a94",
        "user_id": "639d58819ee3fb7390b20f5a",
        "supplies_info": [
            {
                "name": "苹果",
                "quantity": "10"
            },
            {
                "name": "香蕉",
                "quantity": "20"
            }
        ],
        "status": 2,
        "is_accept": true,
        "create_time": "2023-01-08T11:52:54.042Z"
    }
}
```
---
## 5 配额申请表接口
---
## 6 验证码发送与校验接口
### 6.1 发送验证码
请求方式  <span style="color:#FF8C00">POST</span> 
请求路径 `lost-pwd/send`   
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| recipient | String | no | 手机号码或邮箱

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| recipient | String | 手机号码或邮箱回显

响应示例
``` js
{
    "msg": "验证码发送成功",
    "data": {
        "recipient": "17395026862"
    }
}
```
---
### 6.2 校验验证码
请求方式  <span style="color:#FF8C00">POST</span> 
请求路径 `lost-pwd/send`   
> 请求参数
>| 参数名 | 参数类型 | 可否为空 | 备注 | 
>| --- | --- | --- | --- | 
>| recipient | String | no | 手机号码或邮箱
>| code | String | no | 验证码

> 响应参数
>| 参数名 | 参数类型 | 备注 | 初始值 | 
>| --- | --- | --- | --- | 
>| msg | String | 响应说明 
>| status | Number | 响应状态码
>| auth | Boolean | 校验结果,通过为true,否则为false

响应示例
``` js
{
    "msg": "验证码正确",
    "data": {
        "auth": true
    }
}
```
---
## 7 图像上传接口