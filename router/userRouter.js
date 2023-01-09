const express = require('express')
const router = express.Router()
const {postUser, getUser,putUser, deleteUser,getUserById} = require('../handler/userHandler')
const joiSchema = require('../validation')
const joiExpress = require('@escook/express-joi')
const checkID = require('../util/checkID')

// 获取指定id用户
router.get('/:id',checkID,getUserById)
// 获取全部用户信息进行分页
router.get('/',joiExpress(joiSchema.forPagination),getUser)
// 新增用户
router.post('/',joiExpress(joiSchema.forLoginOrRegister),postUser)
// 修改用户信息
router.put('/:id',checkID,putUser)
// 删除用户信息
router.delete('/:id',checkID,deleteUser)
router.delete('/',deleteUser)

module.exports = router
