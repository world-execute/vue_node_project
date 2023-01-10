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
const client = {
    id:'d8ea72313fa64a29b2de00ce93190b90',
    secret: '3a4ebab1805d49dabe40e8fc51215560'
}

module.exports ={
    db_info,
    jwtConfig,
    client
}
