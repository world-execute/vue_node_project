const field = require('../validation/field')
const {trace} = require("joi");

const forLoginOrRegister = {
    body:{
        username:field.username,
        password:field.password
    }
}

const changeMater = {
    body:{
        name:field.name,
        quantity:field.quantity,
        price:field.price,
        type:field.type,
        charge_unit:field.charge_unit,
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

const changePwd = {
    body:{
        id:field.id,
        password:field.password
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

const createQuota = {
    body:{
        user_id:field.user_id,
        reason:field.reason
    }
}

module.exports = joiSchema = {
    forLoginOrRegister,
    changeMater,
    checkName,
    changeDist,
    sendCode,
    checkCode,
    changeEmployee,
    createQuota,
    changePwd
}
