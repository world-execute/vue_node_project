const quotaChangesModule = require('../schema/quota_change')
const postQuota = (req,res) => {
    quotaChangesModule({...req.body}).save().then(result => {
        res.out('创建配额变更表成功',201,result)
    }).catch(err => {
        res.out('创建配额变更表失败',400,err)
    })
}
const getQuota = (req,res) => {
    const filter = {}
    if(req.query.user_id){
        filter.user_id = req.query.user_id
    }
    if(req.query.id){
        filter.id = req.query.id
    }
    if(req.query.is_accept){
        filter.is_accept = req.query.is_accept === 'true'
    }
    const sortInfo = {}
    if(req.query.sort){
        sortInfo.create_time = req.query.sort==='new'?-1:1
    }
    quotaChangesModule.countDocuments().then(count => {
        quotaChangesModule.find(filter).skip(req.skipNumber)
            .populate({
                path:'user_id',
                select:'_id real_name phone'
            })
            .populate({
                path:'employee_id',
                populate:{path:'posts',select:'-_id'},
                select:'_id real_name phone'
            })
            .limit(req.limitNumber)
            .sort(sortInfo).then(result => {
            res.out('获取配额变更表成功',200,{result,total:count})
        }).catch(err => {
            res.out('获取配额变更表失败',400,err)
        })
    })
}

const putQuota = (req,res) => {
    quotaChangesModule.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        .then(result => {
            res.out('修改配额变更表成功',201,result)
        }).catch(err => {
            res.out('修改配额变更表失败',400,err)
    })
}

const deleteQuota = (req,res) => {
    quotaChangesModule.findByIdAndDelete(req.params.id).then(result => {
        res.out('删除配额变更表成功',204,result)
    }).catch(err => {
        res.out('删除配额变更表失败',400,err)
    })
}

module.exports = {
    postQuota,
    getQuota,
    putQuota,
    deleteQuota
}


