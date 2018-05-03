const fs = require('fs')
module.exports = {
    hostname: 'localhost',
    origin: 'https://localhost',
    port: 443,
    options: {
        key: fs.readFileSync(process.env.dev_ssl_key, 'utf-8'),
        cert: fs.readFileSync(process.env.dev_ssl_cert, 'utf-8'),
    },
}