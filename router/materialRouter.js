const express =require('express')
const materialRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {postMater, getMater, putMater, deleteMater} = require('../handler/materialHandler')
const checkID = require('../util/checkID')
const {isValidObjectId} = require("mongoose");

materialRouter.post('/',joiExpress(joiSchema.changeMater),checkID,postMater)

materialRouter.get('/',joiExpress(joiSchema.forPagination),getMater)

materialRouter.put('/:id',joiExpress(joiSchema.changeMater),(req,res,next) => {
    if(!isValidObjectId(req.body.type)){
        return res.out('物资分类id格式不正确',400)
    }
    next()
},putMater)

materialRouter.delete('/:id',checkID,deleteMater)


module.exports = materialRouter
