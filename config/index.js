require('dotenv').config();
const settings = require('./settings');
const constants = require('./constants');
const path = require('path');

// On Vercel, use /tmp for the database as the rest of the filesystem is read-only
const isVercel = process.env.VERCEL === '1';
const databasePath = isVercel
  ? path.join('/tmp', 'history.sqlite')
  : settings.DATABASE_PATH;

module.exports = {
  ...settings,
  ...constants,
  DATABASE_PATH: databasePath,
  DATABASE_URL: process.env.DATABASE_URL,
  ODDS_API_KEY: process.env.ODDS_API_KEY,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: process.env.PORT || 3000
};
