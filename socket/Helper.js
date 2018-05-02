function compose(middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function nameless(context, next) {
        // last called middleware #
        let index = -1
        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(context, () => dispatch(i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}

class SocketHelper {
    constructor() {
        this.middleware = []
    }

    use(fn) {
        this.middleware.push(fn)
        return this
    }

    callback(socket, message) {
        const ctx = this.createCtx(socket, message)
        const onerror = err => ctx.onerror(err)
        const fnMiddleware = compose(this.middleware)
        return fnMiddleware(ctx).catch(onerror)
    }

    createCtx(skt, msg) {
        const socket = skt
        const message = msg
        const onerror = (err) => {
            console.error(err)
            throw new Error('error occur in middleware')
        }
        const ctx = {
            message,
            onerror,
            socket,
        }
        return ctx
    }
}

module.exports = SocketHelper
