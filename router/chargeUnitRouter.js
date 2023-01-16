const express = require('express')
const chargeUnitRouter = express.Router()
const {postUnit, getUnit, deleteUnit} = require('../handler/chargeUnitHandler')
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const checkID = require('../util/checkID')

chargeUnitRouter.post('/',joiExpress(joiSchema.checkName),postUnit)
chargeUnitRouter.get('/',getUnit)
chargeUnitRouter.delete('/:id',checkID('params','id'),deleteUnit)

module.exports = chargeUnitRouter
