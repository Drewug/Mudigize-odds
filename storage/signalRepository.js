const { run, all } = require('./database');
const { getCurrentTimestamp } = require('../utils/time');

module.exports = {
  saveSignal: async (signal) => {
    const { event_id, type, details } = signal;
    const created_at = getCurrentTimestamp();

    await run(
      `INSERT INTO signals (event_id, type, details, created_at)
       VALUES (?, ?, ?, ?)`,
      [event_id, type, JSON.stringify(details), created_at]
    );
  },

  getRecentSignals: async (eventId, type, hours = 24) => {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    const rows = await all(
      `SELECT * FROM signals WHERE event_id = ? AND type = ? AND created_at > ?`,
      [eventId, type, threshold]
    );
    return rows;
  }
};
