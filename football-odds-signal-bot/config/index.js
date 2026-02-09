require('dotenv').config();
const settings = require('./settings');
const constants = require('./constants');

module.exports = {
  ...settings,
  ...constants,
  ODDS_API_KEY: process.env.ODDS_API_KEY,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
