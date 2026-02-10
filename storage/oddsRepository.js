const { run, get } = require('./database');
const { getCurrentTimestamp } = require('../utils/time');

module.exports = {
  saveOdds: async (oddData) => {
    const { id, event_id, sport_key, commence_time, home_team, away_team, bookmaker, market, outcomes } = oddData;
    const fetched_at = getCurrentTimestamp();

    await run(
      `INSERT OR REPLACE INTO odds (id, event_id, sport_key, commence_time, home_team, away_team, bookmaker, market, outcomes, fetched_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, event_id, sport_key, commence_time, home_team, away_team, bookmaker, market, JSON.stringify(outcomes), fetched_at]
    );
  },

  getLatestOdds: async (eventId, bookmaker, market) => {
    const row = await get(
      `SELECT * FROM odds WHERE event_id = ? AND bookmaker = ? AND market = ? ORDER BY fetched_at DESC LIMIT 1`,
      [eventId, bookmaker, market]
    );
    return row ? { ...row, outcomes: JSON.parse(row.outcomes) } : null;
  }
};
