const { getImpliedProbability } = require('./impliedProbability');

module.exports = {
  getPrediction: (markets) => {
    const predictions = [];

    // 1. H2H Prediction
    const h2h = markets.find(m => m.key === 'h2h');
    if (h2h && h2h.outcomes.length === 3) {
      // The Odds API outcomes for h2h are typically [Home, Away, Draw]
      const homeOutcome = h2h.outcomes.find(o => o.name !== 'Draw' && o === h2h.outcomes[0]); // Simple heuristic or name check
      // Actually let's just find by name if possible or use the indices properly
      const home = h2h.outcomes[0];
      const away = h2h.outcomes[1];
      const draw = h2h.outcomes[2];

      const odds = [home.price, away.price, draw.price];
      const [homeP, awayP, drawP] = getImpliedProbability(odds);

      if (homeP > 0.5) predictions.push({ type: 'WIN', outcome: home.name, prob: homeP });
      else if (awayP > 0.5) predictions.push({ type: 'WIN', outcome: away.name, prob: awayP });
      else if (drawP > 0.4) predictions.push({ type: 'DRAW', outcome: draw.name, prob: drawP });
    }

    // 2. Over/Under 2.5 Prediction
    const totals = markets.find(m => m.key === 'totals');
    if (totals) {
      const overOutcome = totals.outcomes.find(o => o.name === 'Over' && o.point === 2.5);
      const underOutcome = totals.outcomes.find(o => o.name === 'Under' && o.point === 2.5);

      if (overOutcome && underOutcome) {
        const [overP, underP] = getImpliedProbability([overOutcome.price, underOutcome.price]);
        if (overP > 0.55) predictions.push({ type: 'TOTALS', outcome: 'Over 2.5 Goals', prob: overP });
        else if (underP > 0.55) predictions.push({ type: 'TOTALS', outcome: 'Under 2.5 Goals', prob: underP });
      }
    }

    // 3. BTTS Prediction
    const btts = markets.find(m => m.key === 'btts');
    if (btts) {
      const yesOutcome = btts.outcomes.find(o => o.name === 'Yes');
      const noOutcome = btts.outcomes.find(o => o.name === 'No');

      if (yesOutcome && noOutcome) {
        const [yesP, noP] = getImpliedProbability([yesOutcome.price, noOutcome.price]);
        if (yesP > 0.55) predictions.push({ type: 'BTTS', outcome: 'BTTS - Yes', prob: yesP });
        else if (noP > 0.6) predictions.push({ type: 'BTTS', outcome: 'BTTS - No', prob: noP });
      }
    }

    return predictions;
  }
};
