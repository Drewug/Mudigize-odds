const { Telegraf } = require('telegraf');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require('../config');
const logger = require('../utils/logger');
const { formatDate } = require('../utils/time');

const bot = TELEGRAM_BOT_TOKEN ? new Telegraf(TELEGRAM_BOT_TOKEN) : null;

module.exports = {
  sendSignal: async (signal) => {
    if (!bot || !TELEGRAM_CHAT_ID) {
      logger.warn('Telegram bot not configured. Skipping notification.');
      return;
    }

    const { type, details } = signal;
    let message = `🚨 *${type.replace(/_/g, ' ')}* 🚨\n\n`;

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
    } else if (type === 'MATCH_PREDICTION') {
      message += `⚽ ${details.match}\n`;
      message += `🏆 ${details.league}\n`;
      message += `⏰ Kickoff: ${formatDate(details.kickoff)}\n\n`;
      message += `🔍 *Predicted Outcomes:*\n`;
      details.predictions.forEach(p => {
        message += `• ${p.pick} (${p.confidence} confidence)\n`;
      });
    }

    try {
      await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
    } catch (error) {
      logger.error('Error sending Telegram message:', error.message);
    }
  }
};
