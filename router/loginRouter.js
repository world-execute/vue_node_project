const express =require('express')
const userModule = require('../schema/user')
const employeeModule = require('../schema/employee')
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginRouter = express.Router()
const {jwtConfig} = require('../config')
loginRouter.post('/user',joiExpress(joiSchema.forLoginOrRegister),(req,res) => {
    const body = {...req.body}
    userModule.findOne({username:body.username}).then(result =>{
        if(result === null || result.is_delete === true){
            return res.out('用户不存在',404)
        }
        const apply = bcrypt.compareSync(body.password,result.password)
        if(apply){
            // 生成jwt
            // 载荷
            const playload ={}
            playload.id = result._id
            playload.username = result.username
            playload.type = result.type
            const token = 'Bearer '+jwt.sign(playload,jwtConfig.secret,jwtConfig.option)
            result.password = undefined
            return res.out('登录成功',200,{user:result,token})
        }
        res.out('密码错误',403)
    }).catch(err => {
        res.out('获取用户失败',400,err)
    })
})

loginRouter.post('/employ',joiExpress(joiSchema.forLoginOrRegister),(req,res) => {
    const body = {...req.body}
    employeeModule.findOne({username:body.username}).then(result => {
        if(result === null){
            return res.out('员工账号不存在',404)
        }
         
    })
})

loginRouter.post('/check',(req,res) => {
    userModule.findById(req.auth.id).select('-password').then(result => {
        res.out('token校验通过',200,result)
    })
    
})
module.exports = loginRouter
