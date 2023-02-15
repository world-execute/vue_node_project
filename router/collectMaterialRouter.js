const express =require('express')
const collectMaterialRouter = express.Router()
const checkId = require('../util/checkID')
const joiExpress = require('@escook/express-joi')
const joiSchema = require('../validation')
const collectMaterialModule = require('../schema/collect_material')

collectMaterialRouter.post('/',joiExpress(joiSchema.createCollectMaterial),
    checkId('body',['user_id','material_id']),(req, res) => {
        collectMaterialModule.find({
            user_id:req.body.user_id,
            material_id:req.body.material_id
        }).then(result => {
            if(result.length !== 0){
                res.out('收藏的物资已存在',200)
            }else {
                collectMaterialModule({...req.body}).save().then(result1 => {
                    res.out('收藏物资添加成功',201,result1)
                }).catch(err => {
                    res.out('收藏物资添加失败',400,err)
                })
            }
        })
})
collectMaterialRouter.get('/:user_id',checkId('params','user_id'),(req, res) => {
    collectMaterialModule.find({
        user_id:req.params.user_id
    }).limit(50).populate({
        path:'material_id',
        select:'_id name'
    }).then(result => {
        res.out('获取收藏物资成功',200,result)
    }).catch(err => {
        res.out('获取收藏物资失败',400,err)
    })
})
collectMaterialRouter.delete('/:id',(req, res) => {
    collectMaterialModule.findByIdAndDelete(req.params.id).then(() => {
        res.out('收藏物资移除成功',204)
    }).catch(err => {
        res.out('收藏物资移除失败',400)
    })
})
module.exports = collectMaterialRouter
