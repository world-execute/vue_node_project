const verificationModule = require('../schema/verification')
const userModule = require('../schema/user')
const express =require('express')
const lostPwdRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const axios = require('axios')
const {client} = require('../config')
const bcrypt = require('bcryptjs')
lostPwdRouter.post('/send',joiExpress(joiSchema.sendCode),((req, res) => {
    userModule.find({phone:req.body.recipient}).then(result => {
        if(result.length === 0){
            return res.out('没有用户使用这个号码',404)
        }
        // 验证码
        const code = Math.floor(Math.random() * (9999 - 1111) ) + 1111
        // 短信验证码模板
        const content = `您的验证码是：${code}。请不要把验证码泄露给其他人。`
        axios.get('https://106.ihuyi.com/webservice/sms.php',{
            params:{
                method:'Submit',
                account:client.id,
                password:client.secret,
                mobile:req.body.recipient,
                content,
                format:'json'
            }
        }).then(({data}) => {
            if(data.code === 2){
                verificationModule({
                    user_id:result[0]._id,
                    recipient:req.body.recipient,
                    code
                }).save().then(value => {
                    return res.out('验证码发送成功',200,value)
                }).catch(err => {
                    return res.out('验证码存储失败',400,err)
                })
            }
            else {
                return res.out('验证码发送失败',400,data.msg)
            }
        }).catch(reason => {
            return res.out('验证码发送失败',400,{error:reason.error})
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


lostPwdRouter.post('/change',joiExpress(joiSchema.changePwd),(req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password,8)
    userModule.findByIdAndUpdate({_id:req.body.id},{password:req.body.password},{new:true}).select('-password').then(result => {
        res.out('修改密码成功',201,result)
    }).catch(err => {
        res.out('修改密码失败',400,err)
    })
})

module.exports = lostPwdRouter
