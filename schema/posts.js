const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsSchema = new Schema({
    name:{
        type:String,
        require:true
    },
},{versionKey:false})
// 导出模型名 postsModule
// 数据库中集合名 posts
// 数据库约束 postsSchema
module.exports = postsModule = mongoose.model('posts',postsSchema)
