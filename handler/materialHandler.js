const materialModule = require('../schema/material')
const {isValidObjectId} = require("mongoose");

const postMater = (req,res) => {
    materialModule.find({name:req.body.name}).lean().then(result => {
        if(result.length !== 0) {
            result[0].quantity += req.body.quantity
            materialModule.findByIdAndUpdate(result[0]._id, {quantity: result[0].quantity}, {new: true})
                .then(result => {
                    res.out('检测到物资重复创建,已将数量叠加',201,result)
                }).catch(err => {
                    res.out('物资创建失败',400,err)
            })
        }else {
            materialModule({...req.body}).save().then(result => {
                res.out('物资创建成功',201,result)
            }).catch(err => {
                res.out('物资创建失败',400,err)
            })
        }
    }).catch(err => {
        res.out('查询重复物资时出错',400,err)
    })
}

const getMater = (req,res) => {
    const keyWord = req.query.search?req.query.search:''
    const checkThreshold = req.query.lower?"this.quantity < this.threshold":'true'
    const sort_info = {}
    console.log(req.query.search);
    if(req.query.sort){
        sort_info.change_time = req.query.sort === 'new'?-1:1
    }
    const filter = {
        name:{$regex:keyWord},
        "$where":checkThreshold
    }
    if(req.query.type){
        filter.type = req.query.type
    }
    materialModule.count(filter).then(count => {
        materialModule.find(filter)
            .populate({
                path:'type',
                select:'-_id',
                populate:{path:'pid',select:'-_id'}
            })
            .populate({
                path:'charge_unit',
                select:'-_id'
            })
            .skip(req.skipNumber).limit(req.limitNumber).sort(sort_info).then(result => {
            res.out('获取物资信息成功',200,{result,total:count})
        }).catch(err => {
            res.out('获取物资信息失败',400,err)
        })
    })
}

const putMater = (req,res) => {
    const materialInfo = {...req.body}
    materialInfo.change_time = Date.now()
    materialModule.findByIdAndUpdate(req.params.id,materialInfo,{new:true}).then(result => {
        res.out('更新物资信息成功',201,result)
    }).catch(err => {
        res.out('更新物资信息失败',400,err)
    })
}

const deleteMater = (req,res) => {
    materialModule.findByIdAndDelete(req.params.id).then(result => {
        res.out('删除物资信息成功',204,result)
    }).catch(err => {
        res.out('删除物资信息失败',400,err)
    })
}

module.exports = {
    postMater,
    getMater,
    putMater,
    deleteMater
}
