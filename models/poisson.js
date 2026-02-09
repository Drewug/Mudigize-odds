const factorial = (n) => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

const poisson = (lambda, k) => {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
};

module.exports = {
  calculateMatchProbabilities: (homeExpectedGoals, awayExpectedGoals, maxGoals = 5) => {
    const matrix = [];
    let homeWin = 0, draw = 0, awayWin = 0;
    let over25 = 0, btts = 0;

    for (let i = 0; i <= maxGoals; i++) {
      for (let j = 0; j <= maxGoals; j++) {
        const prob = poisson(homeExpectedGoals, i) * poisson(awayExpectedGoals, j);

        if (i > j) homeWin += prob;
        else if (i === j) draw += prob;
        else awayWin += prob;

        if (i + j > 2.5) over25 += prob;
        if (i > 0 && j > 0) btts += prob;

        matrix.push({ score: [i, j], prob });
      }
    }

    return {
      homeWin, draw, awayWin,
      over25, btts,
      matrix
    };
  }
};
