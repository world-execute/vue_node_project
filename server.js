const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const {db_info} = require('./config')
const mongoose = require('mongoose')
const joi = require('joi')
// 过滤不属于Schema的数据字段
mongoose.set('strictQuery',true)
// 导入路由
const userRouter = require('./router/userRouter')

// 处理跨域请求
app.use(cors())
// 处理表单资源
app.use(express.urlencoded({extended:false}))
// 处理json数据
app.use(express.json())

// 连接MongoDB数据库
const url = `mongodb://${db_info.host}:${db_info.port}/${db_info.db}`
mongoose.connect(url).then(() => {
    console.log('mongodb is connection')
}).catch((err) => {
    console.log(err)
})
// 封装挂载响应发送的方法
app.use((req,res,next) => {
    res.out = (msg,status,data) =>{
        res.send({
            msg,
            status,
            data:data instanceof Error ? data.message:data,
        })
    }
    next()
})
// 处理路由
app.use('/api/user',userRouter)

app.use((err,req,res,next) => {
    if(err){
        if(err.message === 'No authorization token was found'){
            return res.out('无效的Token或Token已过期',401)
        }
        if(err instanceof joi.ValidationError){
            return res.out(err.message,400)
        }
        return res.status(500).json({msg:'服务器未知错误',err:err.message})
    }
})

app.listen(port,()=>{
    console.log(`server is running,base url: http://localhost:${port}`)
})
