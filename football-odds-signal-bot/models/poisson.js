const factorial = (n) => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

const poisson = (lambda, k) => {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
};

module.exports = {
  calculateMatchProbabilities: (homeExpectedGoals, awayExpectedGoals, maxGoals = 5) => {
    const probs = [];
    for (let i = 0; i <= maxGoals; i++) {
      for (let j = 0; j <= maxGoals; j++) {
        probs.push({
          score: [i, j],
          prob: poisson(homeExpectedGoals, i) * poisson(awayExpectedGoals, j)
        });
      }
    }
    return probs;
  }
};
