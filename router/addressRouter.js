const express =require('express')
const addressRouter = express.Router()
const {postAddress, getAddress} = require('../handler/addressHandler')
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')

addressRouter.post('',joiExpress(joiSchema.checkName,{strict:false}),postAddress)
addressRouter.get('',getAddress)

module.exports = addressRouter
