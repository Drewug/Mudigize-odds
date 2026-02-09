module.exports = {
  getImpliedProbability: (odds) => {
    // odds is an array of numbers
    const implied = odds.map(o => 1 / o);
    const sum = implied.reduce((a, b) => a + b, 0);
    // Remove margin to get true probability estimate
    return implied.map(p => p / sum);
  }
};
