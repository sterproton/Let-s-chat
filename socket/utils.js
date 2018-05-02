const logger = () => async (ctx, next) => {
    console.log(ctx.message)
    await next()
}

const echo = () => async (ctx, next) => {
    ctx.socket.send(ctx.message)
    await next()
}

module.exports = {
    logger,
    echo,
}
