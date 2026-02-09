const { run } = require('../scheduler/runner');
const { initDb } = require('../storage/database');
const logger = require('../utils/logger');

module.exports = async (req, res) => {
  // Optional: Add basic security check for CRON_SECRET if desired
  // if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return res.status(401).end('Unauthorized');
  // }

  try {
    logger.info('Vercel Cron Triggered');
    initDb();
    await run();
    res.status(200).json({ success: true, message: 'Scan completed' });
  } catch (error) {
    logger.error('Vercel Cron Failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
