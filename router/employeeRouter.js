const express =require('express')
const employeeRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {isValidObjectId} = require("mongoose")
const {postEmployee, getEmployee, putEmployee, deleteEmployee} = require('../handler/employeeHandler')
const checkID = require('../util/checkID')
const pagination = require('../util/pagination')

employeeRouter.post('/',joiExpress(joiSchema.changeEmployee),
    checkID('body','posts'),postEmployee)

employeeRouter.get('/',pagination,getEmployee)
employeeRouter.put('/:id',checkID('params','id'),putEmployee)
employeeRouter.delete('/:id',checkID('params','id'),deleteEmployee)

module.exports = employeeRouter
