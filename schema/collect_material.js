const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collect_materialSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    material_id:{
        type:Schema.Types.ObjectId,
        ref:"material",
        required:true
    }
},{versionKey:false})
// 导出模型名 collect_materialModule
// 数据库中集合名 collect_material
// 数据库约束 collect_materialSchema
module.exports = collect_materialModule = mongoose.model('collect_material',collect_materialSchema)