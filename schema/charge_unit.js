const mongoose = require('mongoose')
const Schema = mongoose.Schema

const charge_unitSchema = new Schema({
    name:{
        type:String,
        required:true
    },
},{versionKey:false})
// 导出模型名 charge_unitModule
// 数据库中集合名 charge_unit
// 数据库约束 charge_unitSchema
module.exports = charge_unitModule = mongoose.model('charge_unit',charge_unitSchema)
