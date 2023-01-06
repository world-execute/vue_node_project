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
        path:[/\/api/]
        // path:[/login$/,/register$/,/.png$/,/.jpg$/]
    }
}
module.exports ={
    db_info,
    jwtConfig
}
