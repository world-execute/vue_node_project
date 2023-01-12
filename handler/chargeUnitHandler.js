const charge_unitModule = require('../schema/charge_unit')
const postUnit =  (req,res) => {
      charge_unitModule({...req.body}).save().then(result => {
          res.out('创建计价单位成功',201,result)
      }).catch(err => {
          res.out('创建计价单位失败',400,err)
      })
}
const getUnit = (req,res) => {
    const filter = {}
    if(req.body.query){
        filter.name = req.body.query
    }
    if(req.query.id){
        filter._id = req.query.id
    }
    charge_unitModule.find(filter).then(result => {
        res.out('获取计价单位成功',200,result)
    }).catch(err => {
        res.out('获取计价单位失败',400,err)
    })
}

const deleteUnit = (req,res) => {
    charge_unitModule.findByIdAndDelete(req.params.id).then(result => {
        res.out('删除计价单位成功',204,result)
    }).catch(err => {
        res.out('删除计价单位失败',400,err)
    })
}


module.exports = {
    postUnit,
    getUnit,
    deleteUnit
}
