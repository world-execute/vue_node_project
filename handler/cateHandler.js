const categoriesModule = require('../schema/categories')
const {isValidObjectId} = require("mongoose");

const postCate = (req,res) => {
    categoriesModule({...req.body}).save().then(result => {
        res.out('创建分类成功',201,result)
    }).catch(err => {
        res.out('创建分类失败',400,err)
    })
}

const getCate = async (req,res) => {
    if(req.body.query){
        categoriesModule.find({name:{$regex: req.body.query}}).then(result => {
            res.out('查询成功',200,result)
        }).catch(err => {
            res.out('查询失败',400,err)
        })
    }else {
        let data = await categoriesModule.find({level: 0}).lean()
        // 这里有个巨坑
        // mongoose默认返回的数据并不是object，虽然通过typeof判断类型是Object，但其实mongoose自己封装的一个对象
        // 造成的后果就是无法进行修改,使用官方提供的lean()方法返回标准Object类型
        let childrens = await categoriesModule.find({level: 1}).lean()
        data.forEach(item => {
            item.children = []
            childrens.forEach((children, index) => {
                if (item._id.equals(children.pid)) {
                    item.children.push(children)
                    // delete childrens[index]
                }
            })
        })
        res.out('获取物资分类成功', 200, data)
    }
}

const putCate = (req,res) => {
    if(!isValidObjectId(req.params.id)){
        return res.out('分类id格式不正确',400)
    }
    categoriesModule.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true}).then(result => {
        res.out('修改分类成功',201,result)
    }).catch(err => {
        res.out('修改分类失败',400,err)
    })
}

const deleteCate = (req,res) => {
    if(!isValidObjectId(req.params.id)){
        return res.out('分类id格式不正确',400)
    }
    categoriesModule.findOneAndDelete({_id:req.params.id}).then(result => {
        if(result.level===0){
            // 删除的是一个一级分类,则子分类也会被删除
            categoriesModule.deleteMany({pid:result._id}).exec().catch(err => {
               return res.out('删除该分类的子分类时出错',400)
            })
        }
        res.out('删除分类成功',204,result)
    }).catch(err => {
        res.out('删除分类失败',400,err)
    })
}


module.exports = {
    postCate,
    getCate,
    putCate,
    deleteCate
}
