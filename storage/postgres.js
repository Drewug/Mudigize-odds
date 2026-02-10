const { Pool } = require('pg');
const logger = require('../utils/logger');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const query = (text, params) => pool.query(text, params);

const initPostgres = async () => {
  try {
    await query(`CREATE TABLE IF NOT EXISTS odds (
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

    await query(`CREATE TABLE IF NOT EXISTS signals (
      id SERIAL PRIMARY KEY,
      event_id TEXT,
      type TEXT,
      details TEXT,
      created_at TEXT
    )`);
    logger.info('Postgres database initialized');
  } catch (err) {
    logger.error('Failed to initialize Postgres database', err);
    throw err;
  }
};

module.exports = { pool, query, initPostgres };
