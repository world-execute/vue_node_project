const {isValidObjectId} = require("mongoose");
const checkId = (req,res,next) => {
    if(req.params.id || req.body.id || req.query.id){
        if(isValidObjectId(req.body.id)) return next()
        if(isValidObjectId(req.params.id))return next()
        if(isValidObjectId(req.query.id))return next()
        res.out('id格式不正确',400)
        return
    }
    next()
}
module.exports = checkId
