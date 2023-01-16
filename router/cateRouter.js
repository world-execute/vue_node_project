const express =require('express')
const {postCate, getCate, deleteCate, putCate} = require('../handler/cateHandler')
const cateRouter = express.Router()
const joiSchema = require('../validation')
const joiExpress = require('@escook/express-joi')
const checkID = require('../util/checkID')

cateRouter.post('/',(req,res,next) => {
    // 自定义数据验证
    // 默认传入分类级别为0,代表了为一级分类,当设定为子级分类时,父级的id必须设置
    const body = req.body
    if(!body.pid){
        if(body.level==='0' || !body.level){
            return next()
        }
        return res.out('父级id缺失')
    }
    next()
},checkID('body','pid'),joiExpress(joiSchema.checkName,{strict:true}),postCate)

cateRouter.get('/',getCate)
cateRouter.put('/:id',checkID('params','id'),putCate)
cateRouter.delete('/:id',checkID('params','id'),deleteCate)

module.exports = cateRouter
