const Router = require('koa-router')

const test = new Router()
test.get('/test', async (ctx) => {
    ctx.body = 'this is a test'
})

module.exports = test
