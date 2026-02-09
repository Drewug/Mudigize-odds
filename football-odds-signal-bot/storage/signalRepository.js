const { db } = require('./database');
const { getCurrentTimestamp } = require('../utils/time');

module.exports = {
  saveSignal: (signal) => {
    const { event_id, type, details } = signal;
    const created_at = getCurrentTimestamp();

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO signals (event_id, type, details, created_at)
         VALUES (?, ?, ?, ?)`,
        [event_id, type, JSON.stringify(details), created_at],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  getRecentSignals: (eventId, type, hours = 24) => {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM signals WHERE event_id = ? AND type = ? AND created_at > ?`,
        [eventId, type, threshold],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
};
