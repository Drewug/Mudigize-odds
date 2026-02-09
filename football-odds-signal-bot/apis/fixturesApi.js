const oddsApi = require('./oddsApi');

module.exports = {
  getUpcomingFixtures: async (sportKey) => {
    // The Odds API returns fixtures and odds together in /odds endpoint
    return oddsApi.fetchOdds(sportKey);
  }
};
