const Helper = require('./Helper')
const { logger, echo } = require('./utils')

const socketHelper = new Helper()

socketHelper.use(logger())
socketHelper.use(echo())

module.exports = socketHelper
