const verificationModule = require('../schema/verification')
const express =require('express')
const lostPwdRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const axios = require('axios')
const {client} = require('../config')
lostPwdRouter.post('/send',joiExpress(joiSchema.sendCode),((req, res) => {
    axios.post('https://www.onlyid.net/api/open/send-otp',{
        recipient:req.body.recipient,
        clientId:client.id,
        clientSecret:client.secret
    }).then(({data}) => {
        verificationModule({
            recipient:data.recipient,
            code:data.code
        }).save().catch(err => {
            return res.out('验证码存储失败',400,err)
        })
        res.out('验证码发送成功',200,{recipient:data.recipient})
    }).catch(reason => {
        res.out('验证码发送失败',200,{error:reason.error})
    })
}))

lostPwdRouter.post('/check',joiExpress(joiSchema.checkCode),(req, res) => {
    verificationModule.findOne({recipient:req.body.recipient}).then(result => {
        if(result.code === req.body.code){
            verificationModule.deleteOne({recipient:req.body.recipient}).exec()
            return res.out('验证码正确',200,{auth:true})
        }
        res.out('验证码错误',200, {auth:false})
    }).catch(err => {
        res.out('读取验证码失败',400,err)
    })
})

module.exports = lostPwdRouter
