const address_infoModule = require('../schema/address_info')
const postAddress = (req,res) => {
    address_infoModule({...req.body}).save().then(result => {
        res.out('添加地址描述成功',201,result)
    }).catch(err => {
        console.log(err)
    })
}

const getAddress = (req,res) => {
    const filter = {}
    if(req.query.id)filter._id = req.query.id
    if(req.query.level)filter.level = req.query.level
    if(req.query.parent)filter.parent = req.query.parent
    address_infoModule.find(filter).then(result =>{
        res.out('获取地址描述成功',200,result)
    }).catch(err => {
        console.log(err)
    })
}

const putAddress = (req,res) => {
    const update = {}
    if(req.body.name)update.name = req.body.name
    if(req.body.number)update.number = req.body.number

    address_infoModule.findByIdAndUpdate(req.query.id,{$set:update},{new:true}).then(result => {
        res.out('更新地址描述成功',201,result)
    }).catch(err => {
        console.log(err)
    })

}

const deleteAddress = (req,res) => {
    address_infoModule.findByIdAndDelete(req.query.id).then(result => {
        res.out('移除地址描述成功',204,result)
    }).catch(err => {
        console.log(err)
    })
}
module.exports ={
    postAddress,
    getAddress,
    putAddress,
    deleteAddress
}
