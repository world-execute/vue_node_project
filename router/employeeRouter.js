const express =require('express')
const employeeRouter = express.Router()
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const {isValidObjectId} = require("mongoose")
const {postEmployee, getEmployee, putEmployee, deleteEmployee} = require('../handler/employeeHandler')
const checkID = require('../util/checkID')

employeeRouter.post('/',joiExpress(joiSchema.changeEmployee),(req,res,next) => {
    if(!isValidObjectId(req.body.posts)){
        return res.out('员工职位id格式不正确',400)
    }
    next()
},postEmployee)

employeeRouter.get('/',joiExpress(joiSchema.forPagination),getEmployee)
employeeRouter.put('/:id',checkID,putEmployee)
employeeRouter.delete('/:id',checkID,deleteEmployee)

module.exports = employeeRouter
