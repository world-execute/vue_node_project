const express =require('express')
const notFoundRouter = express.Router()
notFoundRouter.get('*',(req,res) => {
    res.out('请求的路径不存在',404)
})
notFoundRouter.post('*',(req,res) => {
    res.out('请求的路径不存在',404)
})
notFoundRouter.put('*',(req,res) => {
    res.out('请求的路径不存在',404)
})
notFoundRouter.delete('*',(req,res) => {
    res.out('请求的路径不存在',404)
})
module.exports = notFoundRouter
