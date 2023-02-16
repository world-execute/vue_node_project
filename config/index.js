const db_info = {
    host:'127.0.0.1',
    port:'27017',
    db:'demo3'
}
const jwtConfig = {
    secret:'!@@_@@!',
    option:{
        expiresIn:'7day'
    },
    unlessPath:{
        path:[/\/api/,/.png$/,/.jpg$/]
        // path:[/change$/,/send$/,/login$/,/register$/,/.png$/,/.jpg$/]
    }
}
const client = {
    id:'C72636565',
    secret: 'a06bdc1f7182761b57cd69b96a4a401d'
}

module.exports ={
    db_info,
    jwtConfig,
    client
}
