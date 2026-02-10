const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const { DATABASE_PATH, DATABASE_URL } = require('../config');
const logger = require('../utils/logger');
const { pool, query: pgQuery, initPostgres } = require('./postgres');

const isPostgres = !!DATABASE_URL;

let db;
if (!isPostgres) {
  // Ensure directory exists for SQLite
  const dir = path.dirname(DATABASE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if (err) {
      logger.error('Could not connect to SQLite database', err);
    } else {
      logger.info('Connected to SQLite database at ' + DATABASE_PATH);
    }
  });
} else {
  logger.info('Using Postgres database (Neon)');
}

const convertPlaceholders = (sql) => {
  if (!isPostgres) return sql;
  let index = 1;
  return sql.replace(/\?/g, () => `$${index++}`);
};

// SQLite INSERT OR REPLACE -> Postgres INSERT ... ON CONFLICT
const translateSql = (sql) => {
  if (!isPostgres) return sql;

  let translated = sql;
  if (translated.includes('INSERT OR REPLACE INTO odds')) {
    translated = translated.replace(
      'INSERT OR REPLACE INTO odds',
      'INSERT INTO odds'
    ) + ' ON CONFLICT (id) DO UPDATE SET event_id = EXCLUDED.event_id, sport_key = EXCLUDED.sport_key, commence_time = EXCLUDED.commence_time, home_team = EXCLUDED.home_team, away_team = EXCLUDED.away_team, bookmaker = EXCLUDED.bookmaker, market = EXCLUDED.market, outcomes = EXCLUDED.outcomes, fetched_at = EXCLUDED.fetched_at';
  }

  return convertPlaceholders(translated);
};

const run = (sql, params = []) => {
  const translatedSql = translateSql(sql);
  if (isPostgres) {
    return pgQuery(translatedSql, params);
  } else {
    return new Promise((resolve, reject) => {
      db.run(translatedSql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
};

const get = (sql, params = []) => {
  const translatedSql = translateSql(sql);
  if (isPostgres) {
    return pgQuery(translatedSql, params).then(res => res.rows[0] || null);
  } else {
    return new Promise((resolve, reject) => {
      db.get(translatedSql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};

const all = (sql, params = []) => {
  const translatedSql = translateSql(sql);
  if (isPostgres) {
    return pgQuery(translatedSql, params).then(res => res.rows);
  } else {
    return new Promise((resolve, reject) => {
      db.all(translatedSql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

const initDb = async () => {
  if (isPostgres) {
    await initPostgres();
  } else {
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
  }
};

module.exports = { db, initDb, run, get, all, isPostgres };
