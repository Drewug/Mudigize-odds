const mockData = require('./mockData');
const { valueBet, matchPredictor } = require('../signals');
const logger = require('../utils/logger');

const runTest = () => {
  const allSignals = [];

  mockData.forEach(event => {
    console.log(`\n--- Testing Match: ${event.home_team} vs ${event.away_team} ---`);

    // Test Prediction
    const prediction = matchPredictor.predict(event);
    if (prediction) {
      console.log("PREDICTION FOUND:", JSON.stringify(prediction.details, null, 2));
      allSignals.push(prediction);
    }

    // Test Value Bet
    const valueSignals = valueBet.detectValue(event);
    if (valueSignals.length > 0) {
      console.log("VALUE BETS FOUND:", JSON.stringify(valueSignals, null, 2));
      valueSignals.forEach(s => allSignals.push(s));
    }
  });

  return allSignals;
};

if (require.main === module) {
  runTest();
}

module.exports = runTest;
