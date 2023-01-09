const express =require('express')
const distributionRouter = express.Router()
const checkId = require('../util/checkID')
const {isValidObjectId} = require("mongoose");
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {postDist, getDist, putDist, deleteDist} = require('../handler/distributionHandler')

distributionRouter.post('/',joiExpress(joiSchema.changeDist,),(req,res,next) => {
    if(!isValidObjectId(req.body.user_id)){
        return res.out('用户id格式不正确',400)
    }
    next()
},postDist)
distributionRouter.get('/',joiExpress(joiSchema.forPagination,{strict:false}),getDist)
distributionRouter.put('/:id',checkId,putDist)
distributionRouter.delete('/:id',checkId,deleteDist)


module.exports = distributionRouter
