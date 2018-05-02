const modulesIn = require('./utils/modulesIn')
const Router = require('koa-router')


const rootRouter = new Router()

/**
 * input a config object that have a property call 'includePaths' that include
 * the path of the folder that contain router-middleWares modules
 * @param {Object} routeConfig
 */
const registerRouMiddleWares = (routeConfig) => {
    let middleWares = []
    routeConfig.includePaths.forEach((path) => {
        middleWares = middleWares.concat(modulesIn(path))
    })
    middleWares.forEach((middleware) => {
        rootRouter.use('', middleware.routes())
    })
    return rootRouter.routes()
}

module.exports = registerRouMiddleWares
