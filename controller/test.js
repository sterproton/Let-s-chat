const Router = require('koa-router')
const fs = require('fs')

const {
    promisify,
} = require('util')

const readFile = promisify(fs.readFile)

const test = new Router()
test.get('/test', async (ctx, next) => {
    ctx.type = 'html/plain'
    ctx.body = await readFile('../src/test.html', {
        encoding: 'utf-8',
    })
})

module.exports = test
