const { Telegraf } = require('telegraf');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require('../config');
const logger = require('../utils/logger');

const bot = TELEGRAM_BOT_TOKEN ? new Telegraf(TELEGRAM_BOT_TOKEN) : null;

module.exports = {
  sendSignal: async (signal) => {
    if (!bot || !TELEGRAM_CHAT_ID) {
      logger.warn('Telegram bot not configured. Skipping notification.');
      return;
    }

    const { type, details } = signal;
    let message = `🚨 *${type}* 🚨\n\n`;

    if (type === 'VALUE_BET') {
      message += `⚽ ${details.match}\n`;
      message += `🏆 ${details.league}\n`;
      message += `🎯 Pick: *${details.outcome}*\n`;
      message += `📈 Odds: *${details.price}* (Fair: ${details.fair_price})\n`;
      message += `💰 Value: *${details.value}*\n`;
      message += `🏦 Bookmaker: ${details.bookmaker}`;
    } else if (type === 'ODDS_DROP') {
      message += `⚽ ${details.match}\n`;
      message += `🏆 ${details.league}\n`;
      message += `🎯 Pick: *${details.outcome}*\n`;
      message += `📉 Drop: *${details.drop}* (${details.old_price} ➡️ ${details.new_price})\n`;
      message += `🏦 Bookmaker: ${details.bookmaker}`;
    }

    try {
      await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
    } catch (error) {
      logger.error('Error sending Telegram message:', error.message);
    }
  }
};
