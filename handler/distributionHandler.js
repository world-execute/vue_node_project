const distributionModule = require('../schema/distribution')
const userModule = require('../schema/user')
const mongoose = require("mongoose");
const postDist = (req,res) => {
    const body = req.body
    const supplies_names = body.supplies_names.split(',')
    const supplies_quantities = body.supplies_quantities.split(',')
    const supplies_info = []
    supplies_names.map((item,index) => {
        const mixture = {}
        mixture.name = item
        mixture.quantity = supplies_quantities[index]
        supplies_info.push(mixture)
    })
    distributionModule({user_id:body.user_id,supplies_info}).save().then(result => {
        res.out('创建物资配送表成功',201,result)
    }).catch(err => {
        res.out('创建物资配送表失败',400,err)
    })
}

const getDist = (req,res) => {
    const skipNumber = (req.body.page_num -1)*req.body.page_size
    // 通过模糊查询用户来找到对应的配送表
    let keyWord = ''
    if(req.body.query){
         keyWord = req.body.query
        const userFilter = {
            $or:[
                {real_name:{$regex: keyWord}},
                {phone:{$regex: keyWord}},
                {username:{$regex: keyWord}}
            ]
        }
        userModule.find(userFilter).skip(skipNumber).limit(req.body.page_size).select('_id').then(result => {
            result.map(item => {
                distributionModule.find({user_id:item._id}).lean().then(result1 => {
                    res.out('获取物资配送表成功',200,result1)
                }).catch(err => {
                    res.out('获取物资配送表失败',400,err)
                })
            })
        })
        return
    }

    // 通过用户ID精准查询找到对应的配送表
    const filter = {}
    if(req.query.user_id){
        filter.user_id = req.query.user_id
    }
    if(req.query.accept){
        filter.is_accept = req.query.accept === 'true';
    }
    if(req.query.status){
        filter.status = req.query.status
    }

    // 不传入user_id值时就返回全部的配送表数据
    distributionModule.find(filter).populate({path:'user_id',select:'-password'}).skip(skipNumber)
        .limit(req.body.page_size).then(result => {
            res.out('获取物资配送表成功',200,result)
    }).catch(err => [
        res.out('获取物资配送表失败',400,err)
    ])
}

const putDist = (req,res) => {
    distributionModule.findByIdAndUpdate(req.params.id,{...req.body},{new:true}).then(result => {
        res.out('修改物资配送表成功',201,result)
    }).catch(err => {
        res.out('修改物资配送表失败',400,err)
    })
}

const deleteDist = (req,res) => {
    distributionModule.findByIdAndDelete(req.params.id).then(result => {
        res.out('删除物资配送表成功',204,result)
    }).catch(err => {
        res.out('修改物资配送表失败',200,err)
    })
}
module.exports = {
    postDist,
    getDist,
    putDist,
    deleteDist
}
