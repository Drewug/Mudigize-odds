module.exports = {
  calculateValue: (odd, probability) => {
    return (odd * probability) - 1;
  },
  oddsToProbability: (odd) => {
    return 1 / odd;
  }
};
