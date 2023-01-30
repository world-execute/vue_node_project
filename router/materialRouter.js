const express =require('express')
const materialRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {postMater, getMater, putMater, deleteMater} = require('../handler/materialHandler')
const checkID = require('../util/checkID')
const {isValidObjectId} = require("mongoose");
const pagination = require('../util/pagination')

materialRouter.post('/',joiExpress(joiSchema.changeMater),
    checkID('body',['charge_unit,type']),postMater)

materialRouter.get('/',pagination,
    checkID('query',['type']),getMater)

materialRouter.put('/:id',checkID('body',['charge_unit','type']),
    checkID('params','id'),putMater)

materialRouter.delete('/:id',checkID('params','id'),deleteMater)


module.exports = materialRouter
