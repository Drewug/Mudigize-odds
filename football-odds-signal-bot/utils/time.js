module.exports = {
  getCurrentTimestamp: () => new Date().toISOString(),
  formatDate: (date) => new Date(date).toLocaleString(),
  isWithinWindow: (kickoffTime, windowHours) => {
    const now = new Date();
    const kickoff = new Date(kickoffTime);
    const diff = (kickoff - now) / (1000 * 60 * 60);
    return diff > 0 && diff <= windowHours;
  }
};
