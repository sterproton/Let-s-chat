/**
 * set X-response-Time header to look how much time it taked when process request
 */
const setTime = () => async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
}
module.exports = {
    setTime,
}
