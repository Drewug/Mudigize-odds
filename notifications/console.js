const logger = require('../utils/logger');

module.exports = {
  logSignal: (signal) => {
    const { type, details } = signal;
    logger.info(`SIGNAL: ${type} | ${details.match} | ${details.outcome} | ${details.price || details.new_price}`);
  }
};
