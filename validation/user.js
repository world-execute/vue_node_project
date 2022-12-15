const joi = require('joi')
const getErrMessage = require('../joiErrMsg')

const username = joi.string().required().messages(getErrMessage('用户名'))
const password = joi.string().required().messages(getErrMessage('密码'))
const id = joi.string().required().messages(getErrMessage('ID'))
const page_num = joi.number().required().messages(getErrMessage('当前页码'))
const page_size = joi.number().required().messages(getErrMessage('页面大小'))

const forLoginOrRegister = {
    body:{
        username,
        password
    }
}
const forPagination = {
    body:{
        page_size,
        page_num
    }
}

module.exports = joiSchema = {
    forLoginOrRegister,
    forPagination
}
