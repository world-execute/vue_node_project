const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:Array,
        required: true
    }
},{versionKey:false})
// 导出模型名 addressModule
// 数据库中集合名 address
// 数据库约束 addressSchema
module.exports = addressModule = mongoose.model('addresses',addressSchema)
