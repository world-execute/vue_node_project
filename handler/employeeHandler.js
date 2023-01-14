const employeeModule = require('../schema/employee')
const bcrypt = require('bcryptjs')

const postEmployee = (req,res) => {
    const employee = {...req.body}
    employeeModule.find({username:employee.username}).then(result => {
        if(result.length !== 0){
            return res.out('员工已存在',200)
        }
        employee.password = bcrypt.hashSync(employee.password,8)
        employeeModule(employee).save().then(result => {
            result.populate('posts','-_id').then(result => {
                result.password = undefined
                return res.out('创建员工信息成功',201,result)
            })
        }).catch(err => {
            console.log(err.message)
            res.out('创建员工信息失败',400,err)
        })
    })
}

const getEmployee = (req,res) => {
    const filter = {}
    if(req.query.id){
        filter._id = req.query.id
    }
    // 模糊查询
    if(req.body.query){
        const keyWord = req.body.query
        filter.$or = [
            {real_name:{$regex: keyWord}},
            {phone:{$regex: keyWord}},
            {username:{$regex: keyWord}}
        ]
    }
    // 根据职位返回数据
    if(req.query.posts){
        filter.posts = req.query.posts
    }
    const skipNumber = (req.body.page_num - 1)*req.body.page_size
    employeeModule.find(filter).skip(skipNumber).limit(req.body.page_size)
        .populate('posts','-_id').select('-password').then(result => {
        res.out('获取员工信息成功',200,result)
    }).catch(err => {
        res.out('获取员工信息失败',400,err)
    })
}

const putEmployee = (req,res) => {
    if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password,8)
    }
    employeeModule.findByIdAndUpdate(req.params.id,{...req.body},{new:true}).select('-password').then(result => {
        res.out('更新员工信息成功',201,result)
    }).catch(err => {
        res.out('更新员工信息失败',400,err)
    })
}

const deleteEmployee = (req,res) => {
    employeeModule.findByIdAndDelete(req.params.id).select('-password').then(result => {
        res.out('删除员工信息成功',204,result)
    }).catch(err => {
        res.out('删除员工信息失败',400,err)
    })
}

module.exports = {
    postEmployee,
    getEmployee,
    putEmployee,
    deleteEmployee
}
