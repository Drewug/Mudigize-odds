const { calculateValue } = require('../utils/helpers');

module.exports = {
  findValue: (bookmakerOdds, fairProbability) => {
    // bookmakerOdds is an array of { name, price }
    // fairProbability is an array of probabilities corresponding to the same order
    return bookmakerOdds.map((o, i) => ({
      ...o,
      value: calculateValue(o.price, fairProbability[i])
    })).filter(o => o.value > 0);
  }
};
