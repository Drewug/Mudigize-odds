const axios = require('axios');
const { ODDS_API_KEY, MARKETS } = require('../config');
const logger = require('../utils/logger');

const BASE_URL = 'https://api.the-odds-api.com/v4/sports';

module.exports = {
  fetchOdds: async (sportKey, regions = 'eu', markets = MARKETS.H2H) => {
    try {
      if (!ODDS_API_KEY) {
        logger.warn('ODDS_API_KEY is not set. Skipping API call.');
        return [];
      }

      const response = await axios.get(`${BASE_URL}/${sportKey}/odds`, {
        params: {
          apiKey: ODDS_API_KEY,
          regions,
          markets,
          oddsFormat: 'decimal'
        }
      });

      return response.data;
    } catch (error) {
      logger.error(`Error fetching odds for ${sportKey}:`, error.message);
      return [];
    }
  }
};
