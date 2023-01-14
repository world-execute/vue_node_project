const postsModule = require('../schema/posts')
const test = () => {
    postsModule({name:'平台管理员'}).save().then(value => {
        console.log(value)
    },reason => {
        console.log(reason)
    })
}
module.exports = test
