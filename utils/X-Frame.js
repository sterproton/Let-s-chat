const httpsConf = require('../config/httpsConf')

module.exports = async (ctx, next) => {
    if (ctx.request.origin !== httpsConf.origin) {
        ctx.header = {
            "X-Frame-Options": "deny",
        }
    } else {
        await next()
    }
}
