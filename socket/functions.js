const WebSocket = require('ws')

const logger = async (ctx, next) => {
    console.log(ctx.message)
    await next()
}

const echo = () => async (ctx) => {
    ctx.socket.send(ctx.message)
}

const broadcast = async (ctx) => {
    const { server, message } = ctx
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message))
        }
    })
}

const parseMessage = async (ctx, next) => {
    ctx.message = JSON.parse(ctx.message)
    await next()
}

const newUser = async (ctx) => {
    console.log(`new user login ${ctx.message.payload.id}`)
}
module.exports = {
    logger,
    echo,
    parseMessage,
    broadcast,
    newUser,
}
