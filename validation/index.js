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

const checkName = {
    body:{
        name:field.name
    }
}

const changeDist = {
    body:{
        user_id:field.user_id,
        supplies_names:field.supplies_names,
        supplies_quantities:field.supplies_quantities
    }
}

const sendCode = {
    body:{
        recipient:field.recipient
    }
}

const checkCode = {
    body:{
        recipient:field.recipient,
        code:field.code
    }
}

const changeEmployee = {
    body:{
        username: field.username,
        password: field.password,
        real_name:field.real_name,
        phone:field.phone,
        posts:field.posts
    }
}

module.exports = joiSchema = {
    forLoginOrRegister,
    forPagination,
    changeMater,
    checkName,
    changeDist,
    sendCode,
    checkCode,
    changeEmployee
}
