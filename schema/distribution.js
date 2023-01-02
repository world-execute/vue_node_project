// 物资配送信息
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const distributionSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    supplies_info:{
        type: Array,
        required:true
    },
    status:{
        type:Number,
        required: true
    },
    is_accept:{
        type:Boolean,
        required:true
    },
    create_time:{
        type:Date,
        default:Date.now()
    }
},{versionKey:false})
// 导出模型名 distributionModule
// 数据库中集合名 distribution
// 数据库约束 distributionSchema
module.exports = distributionModule = mongoose.model('distribution',distributionSchema)
