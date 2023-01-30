const pagination = (req,res,next) => {
    req.skipNumber = 0
    req.limitNumber = 50
    if(req.query.page_num && req.query.page_size){
        req.skipNumber = (req.query.page_num -1)*req.query.page_size
        req.limitNumber = req.query.page_size
    }
    next()
}
module.exports = pagination
