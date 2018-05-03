const httpsConf = require('./httpsConf')
/**
 * 
 */
module.exports  = {
    verifyClient: (reqInfo, callback) => {
        if(reqInfo.origin === httpsConf.origin){
            callback(true)
        } else{
            callback(false)
        }
    },
}