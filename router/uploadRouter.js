const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest:'public/avatar/'})
const fs = require('fs')
const path = require("path");
const baseUrl = 'http://localhost:8080/'

router.post('/',upload.single('file'),(req, res) => {
    // 使用.分隔文件名
    let fileSplited = req.file.originalname.split(".");
    // 由于不能确定有多个后缀名存在,所有只取最后一个作为后缀
    let fileExtArray = fileSplited[fileSplited.length-1]
    // 根据时间戳生成新的文件名
    let imageName = `${new Date().getTime()}.${fileExtArray}`
    // 根据托管资源目录生成图片地址
    let imageUrl = baseUrl+'avatar/'+imageName
    fs.rename(req.file.path,path.join('public/avatar',imageName),err => {
        if(err){
            return res.send('上传失败')
        }
        res.send({status:'ok',imageUrl})
    })

})
module.exports = router
