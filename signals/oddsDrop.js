const oddsRepository = require('../storage/oddsRepository');
const { ODDS_DROP_THRESHOLD } = require('../config');

module.exports = {
  detectDrop: async (event, bookmakerKey, marketKey) => {
    const bm = event.bookmakers.find(b => b.key === bookmakerKey);
    if (!bm) return [];

    const market = bm.markets.find(m => m.key === marketKey);
    if (!market) return [];

    const latestSaved = await oddsRepository.getLatestOdds(event.id, bookmakerKey, marketKey);
    if (!latestSaved) return [];

    const signals = [];

    market.outcomes.forEach(outcome => {
      const prevOutcome = latestSaved.outcomes.find(o => o.name === outcome.name);
      if (prevOutcome) {
        const drop = (prevOutcome.price - outcome.price) / prevOutcome.price;
        if (drop >= ODDS_DROP_THRESHOLD) {
          signals.push({
            event_id: event.id,
            type: 'ODDS_DROP',
            details: {
              match: `${event.home_team} vs ${event.away_team}`,
              league: event.sport_title,
              outcome: outcome.name,
              old_price: prevOutcome.price,
              new_price: outcome.price,
              drop: (drop * 100).toFixed(2) + '%',
              bookmaker: bm.title
            }
          });
        }
      }
    });

    return signals;
  }
};
