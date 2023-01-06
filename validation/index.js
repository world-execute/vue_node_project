const field = require('../validation/field')
const {trace} = require("joi");

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

const changeMater = {
    body:{
        name:field.name,
        quantity:field.quantity,
        price:field.price,
        type:field.type,
        threshold:field.threshold
    }
}

const changeCate = {
    body:{
        name:field.name
    }
}

module.exports = joiSchema = {
    forLoginOrRegister,
    forPagination,
    changeMater,
    changeCate
}
