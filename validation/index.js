const field = require('../validation/field')

const forLoginOrRegister = {
    body:{
        username:field.username,
        password:field.password
    }
}
const forPagination = {
    body:{
        query:field.query,
        page_size:field.page_size,
        page_num:field.page_num
    }
}

module.exports = joiSchema = {
    forLoginOrRegister,
    forPagination
}
