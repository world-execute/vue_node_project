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
    const skipNumber = (req.body.page_num -1)*req.body.page_size
    const keyWord = req.body.query?req.body.query:''
    const type = req.query.type
    const checkThreshold = req.query.lower?"this.quantity < this.threshold":'true'
    const sort_info = {}
    if(req.query.sort === 'old'){
        sort_info.change_time = 1
    }
    if(req.query.sort === 'new'){
        sort_info.change_time = -1
    }
    const filter = {
        name:{$regex:keyWord},
        "$where":checkThreshold
    }
    if(type && !isValidObjectId(type)){
        return res.out('分类id格式不正确',400)
    }else if (type){
        filter.type=type
    }
    materialModule.find(filter).populate('type')
        .skip(skipNumber).limit(req.body.page_size).sort(sort_info).then(result => {
            res.out('获取物资信息成功',200,result)
    }).catch(err => {
        res.out('获取物资信息失败',400,err)
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
        res.out('删除物资信息成功',201,result)
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
