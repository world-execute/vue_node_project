const express =require('express')
const quotaChangeRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {postQuota, getQuota, deleteQuota,putQuota} = require("../handler/quotaChangeHandler");
const chickID = require('../util/checkID')

quotaChangeRouter.post('/',joiExpress(joiSchema.createQuota),
    postQuota)
quotaChangeRouter.get('/',joiExpress(joiSchema.forPagination),
    chickID('query','user_id'),getQuota)
quotaChangeRouter.put('/:id',chickID('params','id'),
    chickID('body','employee_id'),putQuota)
quotaChangeRouter.delete('/:id',chickID('params','id'),deleteQuota)

module.exports = quotaChangeRouter
