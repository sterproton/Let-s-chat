const Koa = require('koa')
const registerRouter = require('./router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const routeConfig = require('./config/routeConfig')
const {
    setTime,
} = require('./utils/optionalUtils')
const cors = require('@koa/cors')
const serve = require('koa-static')
const path = require('path')
const https = require('https')
const WebSocket = require('ws')
const httpsConf = require('./config/httpsConf')
const socketHelper = require('./socket/socketHelper')

const app = new Koa()

app.use(logger())

app.use(setTime())

app.use(cors({
    credentials: true,
    allowHeaders: [
        'Content-Type',
        'Authorization',
    ],
}))

app.use(bodyParser())

app.use(serve(path.resolve(__dirname, './src')))

app.use(registerRouter(routeConfig))

const server = https.createServer(httpsConf.options, app.callback())
    .listen(httpsConf.port, httpsConf.hostname, () => {
        console.log(`https server running at ${httpsConf.hostname} port ${httpsConf.port}`)
    })

const wss = new WebSocket.Server({
    origin: `https://${httpsConf.hostname}`,
    server,
})

wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        socketHelper.callback(socket, message)
    })
})

