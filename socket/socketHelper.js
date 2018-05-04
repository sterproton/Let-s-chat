const Helper = require('./Helper')
const {
    logger, broadcast, echo, parseMessage,
} = require('./utils')

const socketHelper = new Helper()

const mapper = {
    chatMessage: broadcast,
    echo,
}

socketHelper.use(parseMessage)
socketHelper.use(logger)
socketHelper.dispatch(ctx => mapper[ctx.message.type])


module.exports = socketHelper
