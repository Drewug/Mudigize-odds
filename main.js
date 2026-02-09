const { initDb } = require('./storage/database');
const { startCron } = require('./scheduler/cron');
const { run } = require('./scheduler/runner');
const logger = require('./utils/logger');

const main = async () => {
  logger.info('Mudigize OddsSignal Bot starting...');

  // Initialize Database
  initDb();

  // Run once on startup
  run().catch(err => logger.error('Initial run failed:', err));

  // Start Scheduler
  startCron();
};

main().catch(err => {
  logger.error('Application failed to start:', err);
  process.exit(1);
});
