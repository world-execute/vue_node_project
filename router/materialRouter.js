const express =require('express')
const materialRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {postMater, getMater, putMater, deleteMater} = require('../handler/materialHandler')
const {isValidObjectId} = require("mongoose");

materialRouter.post('/',joiExpress(joiSchema.changeMater),(req,res,next) => {
    if(!isValidObjectId(req.body.type)){
        return res.out('物资分类id格式不正确',400)
    }
    next()
},postMater)

materialRouter.get('/',joiExpress(joiSchema.forPagination),getMater)

materialRouter.put('/:id',joiExpress(joiSchema.changeMater),(req,res,next) => {
    if(!isValidObjectId(req.params.id)){
        return res.out('物资id格式不正确',400)
    }
    if(!isValidObjectId(req.body.type)){
        return res.out('物资分类id格式不正确',400)
    }
    next()
},putMater)

materialRouter.delete('/:id',(req,res,next) => {
    if(!isValidObjectId(req.params.id)){
        return res.out('物资id格式不正确',400)
    }
    next()
},deleteMater)


module.exports = materialRouter
