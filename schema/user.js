const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    real_name:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    ration:{
        type:Number,
        default:10
    },
    apply_supplies:Array,
    apply_ration:Array,
    avatar:{
        type:String,
        default:''
    },
    is_delete:{
        type:Boolean,
        default: false,
    },
    create_time:{
        type:Date,
        default:Date.now()
    }
},{versionKey:false})
// 导出模型名 userModule
// 数据库中集合名 user
// 数据库约束 userSchema
module.exports = userModule = mongoose.model('user',userSchema)
