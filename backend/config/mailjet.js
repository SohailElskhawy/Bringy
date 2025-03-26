require('dotenv').config();
const Mailjet = require('node-mailjet');
const mailjetClient = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

module.exports = mailjetClient;