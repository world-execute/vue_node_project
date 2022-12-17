const joi = require('joi')
const getErrMessage = require('../joiErrMsg')
const fields = {}

fields.username = joi.string().required().messages(getErrMessage('用户名'))
fields.password = joi.string().required().messages(getErrMessage('密码'))
fields.id = joi.string().required().messages(getErrMessage('ID'))
fields.page_num = joi.number().required().messages(getErrMessage('当前页码'))
fields.page_size = joi.number().required().messages(getErrMessage('页面大小'))
fields.query = joi.string().messages(getErrMessage('查询参数'))

module.exports = fields
