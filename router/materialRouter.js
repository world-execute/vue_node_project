const express =require('express')
const materialRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {postMater, getMater, putMater, deleteMater} = require('../handler/materialHandler')
const checkID = require('../util/checkID')
const {isValidObjectId} = require("mongoose");

materialRouter.post('/',joiExpress(joiSchema.changeMater),
    checkID('body',['charge_unit,type']),postMater)

materialRouter.get('/',joiExpress(joiSchema.forPagination),
    checkID('query',['type']),getMater)

materialRouter.put('/:id',joiExpress(joiSchema.changeMater),
    checkID('body',['charge_unit,type']),checkID('params','id'),
    putMater)

materialRouter.delete('/:id',checkID('params','id'),deleteMater)


module.exports = materialRouter
