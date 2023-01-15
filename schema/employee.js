const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    real_name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    posts:{
        type:Schema.Types.ObjectId,
        ref:'posts',
        required:true
    },
    performance:{
        type:Number,
        default:0
    },
    create_time:{
        type:Date,
        default: Date.now
    }
},{versionKey:false})
// 导出模型名 employeeModule
// 数据库中集合名 employee
// 数据库约束 employeeSchema
module.exports = employeeModule = mongoose.model('employee',employeeSchema)
