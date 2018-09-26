const Router = require('koa-router')

const api = new Router()

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

api.get('/api', async (ctx) => {
    ctx.req.setTimeout(1000 * 60 * 30)
    const { sleepTime } = ctx.query
    await sleep(sleepTime)
    ctx.body = 'this is a test api'
})

// const test = async (second) => {
//     const before = new Date().getTime()
//     const data = await axios.get(`/api?sleepTime=${second * 1000}`)
//     const after = new Date().getTime()
//     console.log(`time : ${after - before}
//         data: ${data}
//     `)
// }

module.exports = api
