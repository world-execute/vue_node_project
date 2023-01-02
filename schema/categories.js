// 物资分类信息
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        default:0
    },
    pid:{
        type:Schema.Types.ObjectId
    }
},{versionKey:false})
// 导出模型名 categoriesModule
// 数据库中集合名 categories
// 数据库约束 categoriesSchema
module.exports = categoriesModule = mongoose.model('categories',categoriesSchema)

