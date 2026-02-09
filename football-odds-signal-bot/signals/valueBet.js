const { getImpliedProbability } = require('../models/impliedProbability');
const { VALUE_THRESHOLD, BOOKMAKERS } = require('../config');
const logger = require('../utils/logger');

module.exports = {
  detectValue: (event) => {
    const bookmakers = event.bookmakers;
    const pinnacle = bookmakers.find(b => b.key === BOOKMAKERS.PINNACLE);

    if (!pinnacle) return [];

    const h2hMarket = pinnacle.markets.find(m => m.key === 'h2h');
    if (!h2hMarket) return [];

    const pinnacleOdds = h2hMarket.outcomes.map(o => o.price);
    const fairProbs = getImpliedProbability(pinnacleOdds);

    const signals = [];

    bookmakers.forEach(bm => {
      if (bm.key === BOOKMAKERS.PINNACLE) return;

      const bmH2H = bm.markets.find(m => m.key === 'h2h');
      if (!bmH2H) return;

      bmH2H.outcomes.forEach((outcome, index) => {
        const fairProb = fairProbs[index];
        const value = (outcome.price * fairProb) - 1;

        if (value >= VALUE_THRESHOLD) {
          signals.push({
            event_id: event.id,
            type: 'VALUE_BET',
            details: {
              match: `${event.home_team} vs ${event.away_team}`,
              league: event.sport_title,
              outcome: outcome.name,
              price: outcome.price,
              fair_price: (1 / fairProb).toFixed(2),
              value: (value * 100).toFixed(2) + '%',
              bookmaker: bm.title
            }
          });
        }
      });
    });

    return signals;
  }
};
