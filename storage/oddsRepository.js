const { db } = require('./database');
const { getCurrentTimestamp } = require('../utils/time');

module.exports = {
  saveOdds: (oddData) => {
    const { id, event_id, sport_key, commence_time, home_team, away_team, bookmaker, market, outcomes } = oddData;
    const fetched_at = getCurrentTimestamp();

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR REPLACE INTO odds (id, event_id, sport_key, commence_time, home_team, away_team, bookmaker, market, outcomes, fetched_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, event_id, sport_key, commence_time, home_team, away_team, bookmaker, market, JSON.stringify(outcomes), fetched_at],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  getLatestOdds: (eventId, bookmaker, market) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM odds WHERE event_id = ? AND bookmaker = ? AND market = ? ORDER BY fetched_at DESC LIMIT 1`,
        [eventId, bookmaker, market],
        (err, row) => {
          if (err) reject(err);
          else resolve(row ? { ...row, outcomes: JSON.parse(row.outcomes) } : null);
        }
      );
    });
  }
};
