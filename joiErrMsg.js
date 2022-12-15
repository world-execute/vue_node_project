module.exports = (valueName)=>{
    return {
        'any.required': `${valueName}不能为空`,
        'string.base': `${valueName}必须是合法字符串`,
        'string.empty': `${valueName}不能为空`,
        'string.min': `${valueName}必须大于2个字符`,
        'string.max': `${valueName}必须小于10个字符`,
        'string.alphanum':`${valueName}只能包含大小写字母和数字`,
        'string.email':`${valueName}必须是邮件类型`,
        'date.base':`${valueName}必须是日期类型`

    }
}
