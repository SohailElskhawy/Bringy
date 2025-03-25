const mailjet = require('node-mailjet')

const mailjetClient = mailjet.connect(process.env.MJ_APIKEY_PUBLIC,process.env.MJ_APIKEY_PRIVATE)

module.exports = mailjetClient