const { getPrediction } = require('../models/predictionModel');
const { BOOKMAKERS } = require('../config');

module.exports = {
  predict: (event) => {
    const pinnacle = event.bookmakers.find(b => b.key === BOOKMAKERS.PINNACLE);
    if (!pinnacle) return null;

    const predictions = getPrediction(pinnacle.markets);
    if (predictions.length === 0) return null;

    return {
      event_id: event.id,
      type: 'MATCH_PREDICTION',
      details: {
        match: `${event.home_team} vs ${event.away_team}`,
        league: event.sport_title,
        kickoff: event.commence_time,
        predictions: predictions.map(p => ({
          type: p.type,
          pick: p.outcome,
          confidence: (p.prob * 100).toFixed(0) + '%'
        }))
      }
    };
  }
};
