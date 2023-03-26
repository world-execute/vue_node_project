const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const {db_info, jwtConfig} = require('./config')
const mongoose = require('mongoose')
const joi = require('joi')
const {expressjwt} = require('express-jwt')
const color = require('./util/color')
const test = require('./test')
// 过滤不属于Schema的数据字段
mongoose.set('strictQuery',true)
// 导入路由
const userRouter = require('./router/userRouter')
const loginRouter = require('./router/loginRouter')
const uploadRouter = require('./router/uploadRouter')
const cateRouter = require('./router/cateRouter')
const materialRouter = require('./router/materialRouter')
const distributionRouter = require('./router/distributionRouter')
const lostPwdRouter = require('./router/lostPwdRouter')
const chargeUnitRouter = require('./router/chargeUnitRouter')
const notFoundRouter = require('./router/notFoundRouter')
const employeeRouter = require('./router/employeeRouter')
const quotaChangeRouter = require('./router/quotaChangeRouter')
const collectMaterialRouter = require('./router/collectMaterialRouter')
const addressRouter = require('./router/addressRouter')
const addressInfoRouter = require('./router/addressInfoRouter')

// 处理跨域请求
app.use(cors())
// 处理表单资源
app.use(express.urlencoded({extended:false}))
// 处理json数据
app.use(express.json())
// 验证和解析token
app.use(expressjwt({secret:jwtConfig.secret,algorithms:['HS256']}).unless(jwtConfig.unlessPath))
// 托管公共目录资源
app.use(express.static('public'))

// 连接MongoDB数据库
console.log('--------------------'+color('blueBG','[system info]')+'----------------------------');
const url = `mongodb://${db_info.host}:${db_info.port}/${db_info.db}`
mongoose.connect(url).then(() => {
    console.log(color('green','[databases]'),color('blue','mongodb is connection'))
}).catch((err) => {
    console.log(color('red','mongodb connect err'))
    console.log(err)
})
// 封装挂载响应发送的方法
app.use((req,res,next) => {
    res.out = (msg,status,data) =>{
        data = data instanceof Error ? data.message:data
        if(data && (data.length === 0)){
            msg = '没有获取到相关数据'
            status = 404
        }
        res.send({
            msg,
            status,
            data
        })
    }
    next()
})

// 控制台输出调试
app.use((req,res,next) => {
    console.log('-----------------------'+color('greenBG','[debug]')+'-------------------------------');
    console.log(color('cyan','[method]'),req.method);
    console.log(color('cyan','[path]'),req.path);
    console.log(color('blue','[body]'),req.body);
    console.log(color('blue','[query]'),req.query);
    console.log(color('blue','[params]'),req.params);
    console.log(color('red','[auth]'),req.auth);
    next()
})

// 处理路由
app.use('/api/user',userRouter)
app.use('/api/login',loginRouter)
app.use('/api/upload',uploadRouter)
app.use('/api/categories',cateRouter)
app.use('/api/material',materialRouter)
app.use('/api/distribution',distributionRouter)
app.use('/api/lost-pwd',lostPwdRouter)
app.use('/api/charge-unit',chargeUnitRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/quota-change',quotaChangeRouter)
app.use('/api/collect-material',collectMaterialRouter)
app.use('/api/address',addressRouter)
app.use('/api/address/info',addressInfoRouter)

// 错误处理中间件
app.use((err,req,res,next) => {
    if(err){
        if(err.message === 'invalid token'){
            return res.status(401).send({msg:'Token格式错误',status:401})
        }
        if(err.message === 'No authorization token was found' || err.message === 'jwt expired'){
            return res.status(401).send({msg:'无效的Token或Token已过期',status:401})
        }
        if(err instanceof joi.ValidationError){
            return res.status(422).send({msg:'参数验证错误',status:422,err:err.message})
        }
        console.log('-----------------------'+color('redBG','[ERROR]')+'-------------------------------');
        console.log(color('red','[出现未知错误]  ')+color('red',err.message))
        console.log(color('red','详细信息 : '));
        console.log(err)
        return res.status(500).json({msg:'服务器未知错误',err:err.message})
    }
})

// 测试用接口
// app.use('/api/test',(req,res,next) => {
//     console.log(req.body);  // 请求体
//     console.log(req.query);  // URL参数
//     // console.log(req.params.id);  // URL动态路由参数
//     res.out('ok',400)
// })

// 处理未匹配的路由
app.use(notFoundRouter)
// 测试入口
// test()

// 启动服务,监听端口
app.listen(port,()=>{
    console.log(color('green','[server]'),color('blue','server is running,')+`base url: http://localhost:${port}`)
})
