const userModule = require('../schema/user')
const bcrypt = require('bcryptjs')

const postUser = (req,res) => {
    const userinfo = {...req.body}
    userModule.find({username:userinfo.username}).then(result => {
        if(result.length !== 0){
            return res.out('用户已存在',200)
        }
        // 加密用户密码
        userinfo.password = bcrypt.hashSync(userinfo.password,8)
        userModule(userinfo).save().then(result => {
            result.password = undefined
            res.out('创建用户成功',201,result)
        }).catch(err => {
            res.out('用户创建失败',400,err)
        })
    })
}

const getUserById = (req,res) => {
    userModule.findById(req.params.id).select('-password').then(result => {
        if(result.is_delete){
            return res.out('该用户已被删除',200)
        }
        res.out('获取用户成功',200,result)
    }).catch(err => {
        res.out('获取用户信息失败',400,err)
    })

}
const getUser = (req,res) => {
    // 获取模糊查询关键字
    const keyWord = req.query.search?req.query.search:''
    // 过滤条件
    const filter = {
        is_delete:false,
        $or:[
            {real_name:{$regex: keyWord}},
            {phone:{$regex: keyWord}},
            {username:{$regex: keyWord}}
        ]
    }
    if(req.query.username){
        filter.username = req.query.username
    }
    userModule.countDocuments().then(count => {
        userModule.find(filter).select('-password').skip(req.skipNumber).limit(req.limitNumber).then(async result => {
            res.out('获取用户成功',200,{result,total:count})
        }).catch(err => {
            res.out('获取用户信息失败',400,err)
        })
    })
}

const putUser = (req,res) => {
    if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password,8)
    }
    userModule.findByIdAndUpdate({_id:req.params.id},req.body,{new:true}).select('-password').then(result => {
        res.out('修改用户成功',201,result)
    }).catch(err => {
        res.out('修改用户失败',400,err)
    })
}

// 警告,如果你要删除用户,请先考虑软删除,设定用户is_delete字段为true
const deleteUser = (req,res) => {
    // 若存在id,则删除指定id的用户信息
    if(req.params.id){
        userModule.deleteOne({_id:req.params.id}).then(result => {
            if(result.deletedCount === 0){
                return res.out('没有符合删除条件的数据',404)
            }
            res.out('永久删除成功',201,{deletedCount:result.deletedCount})
        }).catch(err => {
            res.out('删除失败',400,err)
        })
    }else {
        // 不存在id信息,直接删除全部符合条件的数据
        userModule.deleteMany({is_delete:true}).then(result => {
            if(result.deletedCount === 0){
                return res.out('没有符合删除条件的数据',404)
            }
            res.out('永久删除成功',201,{deletedCount:result.deletedCount})
        }).catch(err => {
            res.out('删除失败',400,err)
        })
    }


}

module.exports = {
    postUser,
    getUser,
    putUser,
    deleteUser,
    getUserById
}
