const Helper = require('./Helper')
const {
    logger, broadcast, echo, parseMessage, newUser,
} = require('./functions')

const socketHelper = new Helper()

const mapper = {
    chatMessage: broadcast,
    echo,
    newUser,
}

socketHelper.use(parseMessage)
socketHelper.use(logger)
socketHelper.dispatch(ctx => mapper[ctx.message.type])


module.exports = socketHelper
