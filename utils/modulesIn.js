const fs = require('fs')

/**
 * input the path of the folder that contain modules that you
 * want to get;
 * @param {string} folderPath
 * @return {array}
 */
const modulesIn = (folderPath) => {
    if (!folderPath.endsWith('/')) folderPath += '/'
    const getJsFileNames = folderPath => fs.readdirSync(folderPath)
        .filter(fileName => fileName.endsWith('.js'))
    const getModules = jsFilsNames => jsFilsNames.map(fileName => require(folderPath + fileName))
    const jsFilsNames = getJsFileNames(folderPath)
    const modules = getModules(jsFilsNames)
    return modules
}

module.exports = modulesIn
