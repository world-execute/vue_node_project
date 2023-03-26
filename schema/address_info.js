const mongoose = require('mongoose')
const {number} = require("joi");
const Schema = mongoose.Schema

const address_infoSchema = new Schema({
    // 地址描述名称
    name:{
        type:String,
        required:true
    },
    // 地址描述层级
    level:{
        type:Number,
        required:true
    },
    // 地址描述数量
    number:{
        type:Number,
        required:true
    }
},{versionKey:false})
// 导出模型名 address_infoModule
// 数据库中集合名 address_info
// 数据库约束 address_infoSchema
module.exports = address_infoModule = mongoose.model('address_info',address_infoSchema)
