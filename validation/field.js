const joi = require('joi')
const getErrMessage = require('../joiErrMsg')
const fields = {}

fields.username = joi.string().required().messages(getErrMessage('用户名'))
fields.password = joi.string().required().messages(getErrMessage('密码'))
fields.id = joi.string().required().messages(getErrMessage('ID'))
fields.page_num = joi.number().required().messages(getErrMessage('当前页码'))
fields.page_size = joi.number().required().messages(getErrMessage('页面大小'))
fields.query = joi.string().messages(getErrMessage('查询参数'))
fields.name = joi.string().required().messages(getErrMessage('名称'))
fields.quantity = joi.number().required().messages(getErrMessage('数量'))
fields.price = joi.number().required().messages(getErrMessage('价格'))
fields.type = joi.string().required().messages(getErrMessage('类别'))
fields.threshold = joi.number().required().messages(getErrMessage('阈值'))

module.exports = fields
