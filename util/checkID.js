const {isValidObjectId} = require("mongoose");
const checkId = (type,field) => {
    return (req,res,next) => {
        let flag = true
        let fieldName = []
        if(Array.isArray(field)){
            field.map(item => {
                if(req[type][item] && !isValidObjectId(req[type][item])){
                    flag=false
                    fieldName.push(item)
                }
            })
        }else {
            if(req[type][field] && !isValidObjectId(req[type][field])){
                flag=false
                fieldName.push(field)
            }
        }
        flag?next():res.out(`${fieldName.join()}格式不正确`,422)
    }
}
module.exports = checkId
