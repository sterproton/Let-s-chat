const Router = require('koa-router')
const fs = require('fs')

const {
    promisify,
} = require('util')

const readFile = promisify(fs.readFile)

const index = new Router()
index.get('/', async (ctx) => {
    ctx.type = 'html/plain'
    ctx.body = await readFile('../src/index.html', {
        encoding: 'utf-8',
    })
})

module.exports = index
