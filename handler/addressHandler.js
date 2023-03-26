const addressModule = require('../schema/address')
const e = require("express");

const postAddress = (req,res) => {
    addressModule({...req.body}).save().then(result => {
        res.out('地址创建成功',201,result)
    })
}

const getAddress = (req,res) => {
    const filter = {}
    // 获取标记或者未必标记经纬度的地理位置
    if(req.query.marked === 1) filter.$where = "this.location.length > 0"
    else filter.$where = "this.location.length === 0"
    // 通过id获取
    if(req.query.id) filter._id = req.query.id
    addressModule.find(filter).then(result => {
        res.out('获取地址成功',200,result)
    })
}

module.exports = {
    postAddress,
    getAddress
}
