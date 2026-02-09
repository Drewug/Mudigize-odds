const sqlite3 = require('sqlite3').verbose();
const { DATABASE_PATH } = require('../config');
const logger = require('../utils/logger');

const db = new sqlite3.Database(DATABASE_PATH, (err) => {
  if (err) {
    logger.error('Could not connect to database', err);
  } else {
    logger.info('Connected to SQLite database');
  }
});

const initDb = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS odds (
      id TEXT PRIMARY KEY,
      event_id TEXT,
      sport_key TEXT,
      commence_time TEXT,
      home_team TEXT,
      away_team TEXT,
      bookmaker TEXT,
      market TEXT,
      outcomes TEXT,
      fetched_at TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS signals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id TEXT,
      type TEXT,
      details TEXT,
      created_at TEXT
    )`);
  });
};

module.exports = { db, initDb };
