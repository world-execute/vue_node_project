const db_info = {
    host:'127.0.0.1',
    port:'27017',
    db:'demo3'
}
const jwtConfig = {
    secret:'!@@_@@!',
    option:{
        expiresIn:'1day'
    },
    unlessPath:{
        path:[/login$/,/register$/]
    }
}
module.exports ={
    db_info,
    jwtConfig
}
