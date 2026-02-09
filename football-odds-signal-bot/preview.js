const { notify } = require('./notifications');
const logger = require('./utils/logger');

const runPreview = async () => {
  console.log("\n--- PREVIEW: MATCH PREDICTION ---");
  await notify({
    type: 'MATCH_PREDICTION',
    details: {
      match: 'Bayern Munich vs Borussia Dortmund',
      league: 'German Bundesliga',
      kickoff: new Date(Date.now() + 3600000).toISOString(),
      predictions: [
        { type: 'WIN', pick: 'Bayern Munich', confidence: '65%' },
        { type: 'TOTALS', pick: 'Over 2.5 Goals', confidence: '72%' },
        { type: 'BTTS', pick: 'BTTS - Yes', confidence: '68%' }
      ]
    }
  });

  console.log("\n--- PREVIEW: VALUE BET ---");
  await notify({
    type: 'VALUE_BET',
    details: {
      match: 'Real Madrid vs Barcelona',
      league: 'Spain La Liga',
      outcome: 'Real Madrid',
      price: 2.10,
      fair_price: '1.95',
      value: '7.69%',
      bookmaker: 'Bet365'
    }
  });

  console.log("\n--- PREVIEW: ODDS DROP ---");
  await notify({
    type: 'ODDS_DROP',
    details: {
      match: 'Manchester City vs Liverpool',
      league: 'Premier League',
      outcome: 'Manchester City',
      old_price: 1.90,
      new_price: 1.65,
      drop: '13.16%',
      bookmaker: 'Pinnacle'
    }
  });
};

runPreview();
