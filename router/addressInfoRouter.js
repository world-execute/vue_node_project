const express =require('express')
const addressInfoRouter = express.Router()
const {postAddress, getAddress,deleteAddress, putAddress} = require('../handler/addressInfoHandler')
const checkId = require('../util/checkID')
const joiSchema = require('../validation')
const joiExpress = require('@escook/express-joi')

addressInfoRouter.post('',joiExpress(joiSchema.createAddressInfo),postAddress)
addressInfoRouter.get('',getAddress)
addressInfoRouter.put('',putAddress)
addressInfoRouter.delete('',joiExpress(joiSchema.needId),
    checkId('query','id'), deleteAddress)

module.exports = addressInfoRouter
