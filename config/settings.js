module.exports = {
  VALUE_THRESHOLD: 0.05, // 5% value
  ODDS_DROP_THRESHOLD: 0.10, // 10% drop
  PREDICTION_PROB_THRESHOLD: 0.60, // 60% probability for a "confident" prediction
  TIME_WINDOW_HOURS: 24, // Look ahead 24 hours
  CRON_SCHEDULE: '0 */4 * * *', // Every 4 hours
  DATABASE_PATH: './data/history.sqlite'
};
