const verificationModule = require('../schema/verification')
const userModule = require('../schema/user')
const express =require('express')
const lostPwdRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const axios = require('axios')
const {client} = require('../config')
lostPwdRouter.post('/send',joiExpress(joiSchema.sendCode),((req, res) => {
    userModule.find({phone:req.body.recipient}).then(result => {
        if(result.length === 0){
            return res.out('没有用户使用这个号码',404)
        }
        axios.post('https://www.onlyid.net/api/open/send-otp',{
            recipient:req.body.recipient,
            clientId:client.id,
            clientSecret:client.secret
        }).then(({data}) => {
            verificationModule({
                user_id:result[0]._id,
                recipient:data.recipient,
                code:data.code
            }).save().catch(err => {
                return res.out('验证码存储失败',400,err)
            })
            return res.out('验证码发送成功',200,{recipient:data.recipient})
        }).catch(reason => {
            return res.out('验证码发送失败',200,{error:reason.error})
        })
    })
}))

lostPwdRouter.post('/check',joiExpress(joiSchema.checkCode),(req, res) => {
    verificationModule.findOne({recipient:req.body.recipient}).then(result => {
        if(result.code === req.body.code){
            verificationModule.findOneAndDelete({recipient:req.body.recipient})
                .select('-_id').lean().then(result => {
                return res.out('验证码正确',200,{auth:true,...result})
            }).catch(err => {
                return res.out('删除验证码出错',400,err)
            })
        }else {
            return res.out('验证码错误',200, {auth:false})
        }
    }).catch(err => {
        return res.out('读取验证码失败',400,err)
    })
})

module.exports = lostPwdRouter
