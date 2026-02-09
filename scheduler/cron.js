const cron = require('node-cron');
const { CRON_SCHEDULE } = require('../config');
const { run } = require('./runner');
const logger = require('../utils/logger');

const startCron = () => {
  logger.info(`Scheduling cron job with: ${CRON_SCHEDULE}`);
  cron.schedule(CRON_SCHEDULE, () => {
    run().catch(err => logger.error('Cron job failed:', err));
  });
};

module.exports = { startCron };
