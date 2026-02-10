const express = require('express');
const { initDb } = require('./storage/database');
const { startCron } = require('./scheduler/cron');
const { run } = require('./scheduler/runner');
const logger = require('./utils/logger');
const config = require('./config');

const app = express();
const PORT = config.PORT;

app.get('/', (req, res) => {
  res.send('Mudigize OddsSignal Bot is running!');
});

app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    leagues: config.LEAGUES
  });
});

const startApp = async () => {
  logger.info('Mudigize OddsSignal Bot starting...');

  // Initialize Database
  await initDb();

  // Start Express server for health checks (Render requirement)
  app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
  });

  // Run once on startup
  run().catch(err => logger.error('Initial run failed:', err));

  // Start Scheduler
  startCron();
};

startApp().catch(err => {
  logger.error('Application failed to start:', err);
  process.exit(1);
});
