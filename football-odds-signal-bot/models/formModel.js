module.exports = {
  calculateFormRating: (recentResults) => {
    // recentResults: array of ['W', 'D', 'L', ...]
    const points = { 'W': 3, 'D': 1, 'L': 0 };
    const totalPoints = recentResults.reduce((acc, res) => acc + (points[res] || 0), 0);
    return totalPoints / (recentResults.length * 3);
  }
};
