// 物资信息
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const materialSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:Schema.Types.ObjectId,
        ref:'categories'
    },
    threshold:{
        type:Number,
        required:true
    },
    change_time:{
        type:Date,
        default:Date.now
    }
},{versionKey:false})
// 导出模型名 materialModule
// 数据库中集合名 material
// 数据库约束 materialSchema
module.exports = materialModule = mongoose.model('material',materialSchema)
