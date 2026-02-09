const { getImpliedProbability } = require('../models/impliedProbability');
const { VALUE_THRESHOLD, BOOKMAKERS } = require('../config');

module.exports = {
  detectDoubleChanceValue: (event) => {
    // This would require fetching 'double_chance' market from the API
    // For now we can derive it from H2H odds
    const pinnacle = event.bookmakers.find(b => b.key === BOOKMAKERS.PINNACLE);
    if (!pinnacle) return [];

    const h2hMarket = pinnacle.markets.find(m => m.key === 'h2h');
    if (!h2hMarket) return [];

    const [homeOdd, drawOdd, awayOdd] = h2hMarket.outcomes.map(o => o.price);
    const [homeProb, drawProb, awayProb] = getImpliedProbability([homeOdd, drawOdd, awayOdd]);

    const dcProbs = {
      'Home/Draw': homeProb + drawProb,
      'Home/Away': homeProb + awayProb,
      'Draw/Away': drawProb + awayProb
    };

    const signals = [];
    // If the API provided double_chance market, we would compare here.
    // Since it's a bit more complex with free tier (limited markets per call),
    // we'll leave this as a placeholder or implementation for when dc market is fetched.

    return signals;
  }
};
