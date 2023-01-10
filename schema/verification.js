const mongoose = require('mongoose')
const Schema = mongoose.Schema

const verificationSchema = new Schema({
    recipient:{
        type:String,
        require:true
    },
    code:{
        type:String,
        required:true
    }
},{versionKey:false})
// 导出模型名 verificationModule
// 数据库中集合名 verification
// 数据库约束 verificationSchema
module.exports = verificationModule = mongoose.model('verification',verificationSchema)
